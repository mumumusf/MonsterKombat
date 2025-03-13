/**
 * MonsterKombat 自动化工具
 * 作者: 小林
 * 功能: 批量创建钱包、自动完成游戏任务、获取奖励
 */
import { promises as fs } from 'fs';
import axios from 'axios';
import { Wallet } from 'ethers';
import { createInterface } from 'readline';
import displayBanner from './banner.js';

// 创建命令行交互界面
const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * 获取默认请求头
 * @param {string} token - 授权令牌
 * @returns {object} - 请求头对象
 */
function getDefaultHeaders(token = '') {
    const headers = {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'en-US,en;q=0.8',
        'content-type': 'application/json',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
        'origin': 'https://game.monsterkombat.io',
        'referer': 'https://game.monsterkombat.io/',
        'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Brave";v="134"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'sec-gpc': '1',
        'priority': 'u=1, i'
    };
    if (token) headers['authorization'] = `Bearer ${token}`;
    return headers;
}

/**
 * 生成随机以太坊钱包
 * @returns {object} - 包含地址和私钥的钱包对象
 */
function generateWallet() {
    const wallet = Wallet.createRandom();
    return {
        address: wallet.address,
        privateKey: wallet.privateKey
    };
}

/**
 * 使用钱包私钥创建签名
 * @param {object} wallet - 钱包对象
 * @param {string} message - 要签名的消息
 * @returns {string} - 签名结果
 */
async function createSignature(wallet, message) {
    const signer = new Wallet(wallet.privateKey);
    const signature = await signer.signMessage(message);
    return signature;
}

/**
 * 使用钱包登录游戏
 * @param {object} wallet - 钱包对象
 * @param {string} refCode - 推荐码
 * @returns {string|null} - 成功返回访问令牌，失败返回null
 */
async function signIn(wallet, refCode) {
    const url = 'https://api.monsterkombat.io/auth/sign-in';
    const connectTime = Date.now();
    const message = `Login to the app. Connect time: ${connectTime}`;
    const signature = await createSignature(wallet, message);

    const payload = {
        message,
        signature,
        address: wallet.address,
        refCode
    };

    try {
        const response = await axios.post(url, payload, { headers: getDefaultHeaders() });
        console.log(`✅ 登录成功 = 地址: ${wallet.address}, 令牌: ${response.data.accessToken}`);
        return response.data.accessToken;
    } catch (error) {
        const errMsg = error.response ? `${error.response.status}: ${error.response.data.message || '未知错误'}` : error.message;
        console.error(`❌ 登录失败 = ${errMsg}`);
        return null;
    }
}

/**
 * 开启免费宝可梦
 * @param {string} token - 访问令牌
 * @returns {boolean} - 操作是否成功
 */
async function openFreePokemon(token) {
    const url = 'https://api.monsterkombat.io/pokemons/open-free-pokemon';
    try {
        const response = await axios.post(url, {}, { headers: getDefaultHeaders(token) });
        console.log(`✅ 开启免费宝可梦 = ${response.data.message || '开启成功'}`);
        return true;
    } catch (error) {
        const errMsg = error.response ? `${error.response.status}: ${error.response.data.message || '未知错误'}` : error.message;
        console.error(`❌ 开启免费宝可梦失败 = ${errMsg}`);
        return false;
    }
}

/**
 * 获取我的宝可梦列表
 * @param {string} token - 访问令牌
 * @returns {array} - 宝可梦列表
 */
async function getMyPokemons(token) {
    const url = 'https://api.monsterkombat.io/pokemons/my-pets?sortField=tier&keyword=&sortDirection=asc';
    try {
        const response = await axios.get(url, { headers: getDefaultHeaders(token) });
        console.log(`✅ 获取宝可梦列表 = 数量: ${response.data.pokemons.items.length}`);
        return response.data.pokemons.items;
    } catch (error) {
        const errMsg = error.response ? `${error.response.status}: ${error.response.data.message || '未知错误'}` : error.message;
        console.error(`❌ 获取宝可梦列表失败 = ${errMsg}`);
        return [];
    }
}

/**
 * 进行战斗
 * @param {string} token - 访问令牌
 * @param {string} pokemonId - 宝可梦ID
 * @returns {object} - 战斗结果
 */
async function fight(token, pokemonId) {
    const url = 'https://api.monsterkombat.io/battles/fight';
    const winRate = 70; 
    const payload = {
        monsterWinRate: winRate,
        pokemonIds: [pokemonId]
    };

    try {
        const response = await axios.post(url, payload, { headers: getDefaultHeaders(token) });
        
        if (response.data.details && response.data.details.length > 0) {
            const battleDetails = response.data.details[0];
            const isWin = battleDetails.is_win;
            const earnedToken = battleDetails.earned_token;
            const earnedGem = battleDetails.earned_gem;
            const pokemonElement = battleDetails.element;
            const pokemonTier = battleDetails.tier;
            
            const winStatus = isWin ? '🏆 胜利' : '❌ 失败';
            const earnings = `💰 代币: ${earnedToken}, 💎 宝石: ${earnedGem}`;
            
            console.log(`✅ 战斗结果 = ${winStatus} | ${earnings} | 元素: ${pokemonElement}, 等级: ${pokemonTier}`);
            return {
                success: true,
                isWin,
                earnedToken,
                earnedGem,
                element: pokemonElement,
                tier: pokemonTier
            };
        } else {
            console.log(`✅ 战斗结果 = 状态不可用`);
            return { success: true };
        }
    } catch (error) {
        const errMsg = error.response ? `${error.response.status}: ${error.response.data.message || '未知错误'}` : error.message;
        console.error(`❌ 战斗失败 = ${errMsg}`);
        return { success: false };
    }
}

/**
 * 获取任务列表
 * @param {string} token - 访问令牌
 * @param {string} type - 任务类型
 * @returns {array} - 任务列表
 */
async function getTasks(token, type = 'BASIC_TASK') {
    const url = `https://api.monsterkombat.io/mission/client?type=${type}`;
    try {
        const response = await axios.get(url, { headers: getDefaultHeaders(token) });
        console.log(`✅ 获取任务列表 = 类型:${type}, 数量: ${response.data.missionTasks.length}`);
        return response.data.missionTasks;
    } catch (error) {
        const errMsg = error.response ? `${error.response.status}: ${error.response.data.message || '未知错误'}` : error.message;
        console.error(`❌ 获取任务列表失败 = ${errMsg}`);
        return [];
    }
}

/**
 * 更新任务进度
 * @param {string} token - 访问令牌
 * @param {string} missionId - 任务ID
 * @returns {boolean} - 操作是否成功
 */
async function updateTaskProgress(token, missionId) {
    const url = `https://api.monsterkombat.io/mission/update-progress/${missionId}`;
    try {
        const response = await axios.patch(url, {}, { headers: getDefaultHeaders(token) });
        console.log(`✅ 更新任务进度 = 任务ID:${missionId}, 状态: ${response.data.status}`);
        return true;
    } catch (error) {
        const errMsg = error.response ? `${error.response.status}: ${error.response.data.message || '未知错误'}` : error.message;
        console.error(`❌ 更新任务进度失败 = ${errMsg}`);
        return false;
    }
}

/**
 * 领取任务奖励
 * @param {string} token - 访问令牌
 * @param {string} missionId - 任务ID
 * @returns {boolean} - 操作是否成功
 */
async function claimTaskReward(token, missionId) {
    const url = `https://api.monsterkombat.io/users/claim-mission-reward/${missionId}`;
    try {
        const response = await axios.post(url, {}, { headers: getDefaultHeaders(token) });
        console.log(`✅ 领取任务奖励 = 任务ID:${missionId}, 成功: ${response.data.success}`);
        return true;
    } catch (error) {
        const errMsg = error.response ? `${error.response.status}: ${error.response.data.message || '未知错误'}` : error.message;
        console.error(`❌ 领取任务奖励失败 = ${errMsg}`);
        return false;
    }
}

/**
 * 获取用户余额
 * @param {string} token - 访问令牌
 * @returns {object} - 包含宝石和代币余额的对象
 */
async function getUserBalance(token) {
    const url = 'https://api.monsterkombat.io/users/balance';
    try {
        const response = await axios.get(url, { headers: getDefaultHeaders(token) });
        return {
            gem: response.data.gem || 0,
            token: response.data.mkoin || 0
        };
    } catch (error) {
        const errMsg = error.response ? `${error.response.status}: ${error.response.data.message || '未知错误'}` : error.message;
        console.error(`❌ 获取余额失败 = ${errMsg}`);
        return { gem: 0, token: 0 };
    }
}

/**
 * 完成所有基础任务
 * @param {string} token - 访问令牌
 */
async function completeTasks(token) {
    console.log('⚡ 正在处理基础任务...');
    const tasks = await getTasks(token, 'BASIC_TASK');
    if (tasks.length === 0) {
        console.log('❌ 未找到任务');
        return;
    }

    for (const task of tasks) {
        console.log(`  ➡️ 任务: ${task.mission_code} - ${task.mission_name}`);
        if (!task.is_claim) {
            if (task.current_collect < task.mission_target) {
                console.log(`     ➡️ 正在完成...`);
                const updated = await updateTaskProgress(token, task.mission_code);
                if (!updated) continue;
            }
            console.log(`     ➡️ 正在领取奖励...`);
            await claimTaskReward(token, task.mission_code);
        } else {
            console.log(`     ✅ 已领取奖励`);
        }
    }
    console.log('✅ 所有任务处理完成');
}

/**
 * 保存钱包信息到本地文件
 * @param {object} wallet - 钱包对象
 * @param {string} accessToken - 访问令牌
 * @param {string} refCode - 推荐码
 * @param {object} balance - 余额信息
 */
async function saveWallet(wallet, accessToken, refCode, balance = { gem: 0, token: 0 }) {
    let wallets = [];
    try {
        const data = await fs.readFile('wallets.json', 'utf8');
        wallets = JSON.parse(data);
    } catch (error) {
        // 文件不存在或解析错误，使用空数组
    }

    wallets.push({
        address: wallet.address,
        privateKey: wallet.privateKey,
        accessToken: accessToken,
        refCode: refCode,
        balance: balance,
        createdAt: new Date().toISOString()
    });

    await fs.writeFile('wallets.json', JSON.stringify(wallets, null, 2));
    console.log(`✅ 钱包已保存: ${wallet.address}`);
}

/**
 * 从用户输入获取推荐码
 * @returns {Promise<string|null>} - 推荐码或null
 */
async function getReferralCode() {
    try {
        const refCode = await askQuestion('请输入推荐码: ');
        if (!refCode.trim()) throw new Error('推荐码为空');
        console.log(`✅ 已输入推荐码: ${refCode}`);
        return refCode.trim();
    } catch (error) {
        console.error(`❌ 获取推荐码失败: ${error.message}`);
        return null;
    }
}

/**
 * 显示战斗结果摘要
 * @param {array} battleResults - 战斗结果数组
 */
function displayBattleSummary(battleResults) {
    let wins = 0;
    let losses = 0;
    let totalTokens = 0;
    let totalGems = 0;

    for (const result of battleResults) {
        if (result.isWin) wins++;
        else losses++;
        
        totalTokens += result.earnedToken || 0;
        totalGems += result.earnedGem || 0;
    }

    console.log('==============================================');
    console.log('                战斗结果摘要                  ');
    console.log('==============================================');
    console.log(`🏆 胜利: ${wins}`);
    console.log(`❌ 失败: ${losses}`);
    console.log(`💰 总代币: ${totalTokens}`);
    console.log(`💎 总宝石: ${totalGems.toFixed(2)}`);
    console.log('==============================================');
}

/**
 * 批量注册钱包并执行游戏操作
 * @param {number} count - 要创建的钱包数量
 * @param {string} refCode - 推荐码
 */
async function registerWallets(count, refCode) {
    console.log('==============================================');
    console.log('           MonsterKombat 自动机器人           ');
    console.log('               小林出品                      ');
    console.log('==============================================');

    for (let i = 1; i <= count; i++) {
        console.log(`\n⚡ 正在创建第 ${i} 个钱包...`);
        const wallet = generateWallet();
        console.log(`✅ 地址: ${wallet.address}`);

        console.log('⚡ 正在登录...');
        const accessToken = await signIn(wallet, refCode);
        if (!accessToken) {
            console.log(`❌ 注册钱包失败: ${wallet.address}`);
            continue;
        }

        console.log('⚡ 正在开启免费宝可梦...');
        await openFreePokemon(accessToken);

        console.log('⚡ 正在获取宝可梦列表...');
        const pokemons = await getMyPokemons(accessToken);
        
        const battleResults = [];
        if (pokemons.length > 0) {
            const pokemonId = pokemons[0]._id;
            console.log(`✅ 宝可梦: ${pokemons[0].name} (ID: ${pokemonId})`);

            console.log('⚡ 开始第一场战斗...');
            const battle1 = await fight(accessToken, pokemonId);
            if (battle1.success) battleResults.push(battle1);
            
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            console.log('⚡ 开始第二场战斗...');
            const battle2 = await fight(accessToken, pokemonId);
            if (battle2.success) battleResults.push(battle2);
        } else {
            console.log('❌ 未找到宝可梦');
        }

        await completeTasks(accessToken);
        
        console.log('⚡ 正在获取余额...');
        const balance = await getUserBalance(accessToken);
        console.log(`✅ 余额: 💰 代币: ${balance.token}, 💎 宝石: ${balance.gem}`);

        if (battleResults.length > 0) {
            let wins = 0;
            let losses = 0;
            let totalTokens = 0;
            let totalGems = 0;

            for (const result of battleResults) {
                if (result.isWin) wins++;
                else losses++;
                
                totalTokens += result.earnedToken || 0;
                totalGems += result.earnedGem || 0;
            }

            console.log('  ==============================================');
            console.log('                 战斗结果摘要                   ');
            console.log('  ==============================================');
            console.log(`  🏆 胜利: ${wins}`);
            console.log(`  ❌ 失败: ${losses}`);
            console.log(`  💰 总代币: ${totalTokens}`);
            console.log(`  💎 总宝石: ${totalGems.toFixed(2)}`);
            console.log('  ==============================================');
        }

        await saveWallet(wallet, accessToken, refCode, balance);

        // 如果不是最后一个钱包，等待10秒后继续
        if (i < count) {
            console.log(`\n⏳ 等待10秒后创建下一个钱包...`);
            await new Promise(resolve => setTimeout(resolve, 10000));
        }
    }

    console.log('\n==============================================');
    console.log('               注册完成                       ');
    console.log('==============================================');
}

/**
 * 提问并获取用户输入
 * @param {string} query - 问题
 * @returns {Promise<string>} - 用户输入
 */
function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

/**
 * 主函数
 */
async function main() {
    displayBanner();

    const refCode = await getReferralCode();
    if (!refCode) {
        console.error('❌ 没有推荐码无法继续!');
        rl.close();
        return;
    }

    const count = await askQuestion('请输入要创建的钱包数量: ');
    const walletCount = parseInt(count);

    if (isNaN(walletCount) || walletCount <= 0) {
        console.error('❌ 钱包数量必须是正整数!');
        rl.close();
        return;
    }

    await registerWallets(walletCount, refCode);
    rl.close();
}

main().catch(error => {
    console.error('\n❌ 主程序错误 =', error.message);
    rl.close();
});