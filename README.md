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

# 安装必要依赖
npm install axios@1.8.3 ethers@5.7.2 chalk@5.4.1

# 修复依赖安全问题
npm audit fix
# 如果上述命令无法修复所有问题，请使用
npm audit fix --force

# 如果使用 Windows 系统，还需要安装
npm install -g cross-env

# 如果使用 Linux/Mac 系统，可能需要安装 screen
apt-get install screen  # Ubuntu/Debian
yum install screen      # CentOS
```