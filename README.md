[English](README_EN.md) | 简体中文

[![GitHub](https://img.shields.io/badge/GitHub-MonsterKombat-blue?logo=github)](https://github.com/mumumusf/MonsterKombat)

# MonsterKombat 自动化工具

一个用于 MonsterKombat 游戏的自动化工具

## 游戏链接

➡️ [Monster Kombat Game](https://game.monsterkombat.io/?ref=vztUSN9j)

## 功能特点

- ✨ 自动创建钱包
- 🎯 自动完成游戏任务
- ⚔️ 自动战斗
- 💰 自动领取奖励
- 📊 详细的战斗数据统计

## VPS 环境配置教程

### 1. 安装 NVM（Node Version Manager）

```bash
# 下载并安装 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# 根据您使用的 shell 执行以下命令之一
source ~/.bashrc   # 如果使用 bash
source ~/.zshrc    # 如果使用 zsh
```

### 2. 安装 Node.js

```bash
# 安装 Node.js 22
nvm install 22

# 查看已安装的版本
nvm list
```

### 3. 设置默认 Node.js 版本

```bash
# 使用 Node.js 22
nvm use 22

# 设置为默认版本
nvm alias default 22
```

### 4. 验证安装

```bash
# 检查 Node.js 版本
node -v   # 预期输出: v22.x.x

# 检查当前使用的 nvm 版本
nvm current # 预期输出: v22.x.x

# 检查 npm 版本
npm -v    # 预期输出: 10.x.x
```

## 项目安装

1. 克隆项目
```bash
git clone https://github.com/mumumusf/MonsterKombat.git
cd MonsterKombat
```

2. 初始化项目
```bash
# 创建 package.json
npm init -y

# 安装依赖
npm install axios ethers chalk
```

## 使用说明

1. 运行方式（三选一）：

```bash
# 方式1：直接运行（前台运行）
node monster.js

# 方式2：使用 screen 后台运行（推荐）
screen -S monster
node monster.js
# 按 Ctrl+A 然后按 D 分离会话

# 方式3：使用 pm2 后台运行
pm2 start monster.js --name monster
```

2. 按提示输入：
   - 输入您的推荐码
   - 输入要创建的钱包数量
   - 等待脚本自动执行完成

3. 运行结果：
   - 所有创建的钱包信息将保存在 `wallets.json` 文件中
   - 每个钱包将自动完成：
     * 创建新钱包
     * 登录游戏
     * 开启免费宝可梦
     * 进行两场战斗
     * 完成所有基础任务
     * 保存钱包信息和余额

4. 查看运行状态：
```bash
# 如果使用 screen
screen -r monster    # 重新连接到会话
screen -ls          # 查看所有会话

# 如果使用 pm2
pm2 logs monster    # 查看日志
pm2 status         # 查看状态
```

5. 停止运行：
```bash
# 如果使用 screen
screen -r monster    # 重新连接到会话
# 按 Ctrl+C 停止程序
exit                # 退出会话

# 如果使用 pm2
pm2 stop monster    # 停止程序
pm2 delete monster  # 删除程序
```

## 注意事项

- ⚠️ 请确保 VPS 有稳定的网络连接
- ⚠️ 建议使用 screen 或 tmux 在后台运行脚本
- ⚠️ 每个钱包创建之间有 10 秒的延迟，无论创建成功或失败都会等待
- ⚠️ 定期检查 wallets.json 文件以查看钱包信息
- ⚠️ 请勿频繁创建大量钱包，以免被游戏服务器限制

## 使用 Screen 后台运行（推荐）

```bash
# 安装 screen
apt-get install screen  # Ubuntu/Debian
yum install screen      # CentOS

# 创建新的 screen 会话
screen -S monster

# 运行脚本
npm start

# 分离 screen 会话（保持脚本运行）
# 按 Ctrl+A 然后按 D

# 重新连接到 screen 会话
screen -r monster

# 查看所有 screen 会话
screen -ls
```

## ⚠️ 免责声明

- 本程序仅供学习交流使用
- 使用本程序产生的任何后果由用户自行承担
- 请遵守相关平台的服务条款

## 📱 联系方式

- Twitter：[@YOYOMYOYOA](https://x.com/YOYOMYOYOA)
- Telegram：[@YOYOZKS](https://t.me/YOYOZKS)

---
由 [@YOYOMYOYOA](https://x.com/YOYOMYOYOA) 用❤️制作 