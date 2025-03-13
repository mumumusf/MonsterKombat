English | [简体中文](README.md)

# MonsterKombat Automation Tool

🎮 An automation tool for MonsterKombat game

## Game Link

➡️ [Monster Kombat Game](https://game.monsterkombat.io/?ref=vztUSN9j)

## Features

- ✨ Automatic wallet creation
- 🎯 Automatic task completion
- ⚔️ Automatic battles
- 💰 Automatic reward collection
- 📊 Detailed battle statistics

## VPS Environment Setup Guide

### 1. Install NVM (Node Version Manager)

```bash
# Download and install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# Execute one of the following commands based on your shell
source ~/.bashrc   # if using bash
source ~/.zshrc    # if using zsh
```

### 2. Install Node.js

```bash
# Install Node.js 22
nvm install 22

# View installed versions
nvm list
```

### 3. Set Default Node.js Version

```bash
# Use Node.js 22
nvm use 22

# Set as default version
nvm alias default 22
```

### 4. Verify Installation

```bash
# Check Node.js version
node -v   # Expected output: v22.x.x

# Check current nvm version
nvm current # Expected output: v22.x.x

# Check npm version
npm -v    # Expected output: 10.x.x
```

## Project Installation

1. Clone project (if git repository exists) or create project directory
```bash
mkdir monster-bot
cd monster-bot
```

2. Initialize project
```bash
# Create package.json
npm init -y

# Install required dependencies
npm install axios@1.8.3 ethers@5.7.2 chalk@5.4.1

# Fix dependency security issues
npm audit fix
# If the above command doesn't fix all issues, use
npm audit fix --force

# If using Windows, also install
npm install -g cross-env

# If using Linux/Mac, you may need to install screen
apt-get install screen  # Ubuntu/Debian
yum install screen      # CentOS
```