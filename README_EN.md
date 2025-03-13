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

## Usage Instructions

1. Running Methods (Choose one):

```bash
# Method 1: Direct Run (Foreground)
node monster.js

# Method 2: Run with screen in background (Recommended)
screen -S monster
node monster.js
# Press Ctrl+A then D to detach session

# Method 3: Run with pm2 in background
npm install -g pm2
pm2 start monster.js --name monster
```

2. Follow the prompts:
   - Enter your referral code
   - Enter the number of wallets to create
   - Wait for the script to complete automatically

3. Expected Results:
   - All created wallet information will be saved in `wallets.json`
   - For each wallet, it will automatically:
     * Create new wallet
     * Login to game
     * Open free Pokemon
     * Complete two battles
     * Complete all basic tasks
     * Save wallet info and balance

4. Check Running Status:
```bash
# If using screen
screen -r monster    # Reconnect to session
screen -ls          # List all sessions

# If using pm2
pm2 logs monster    # View logs
pm2 status         # Check status
```

5. Stop Running:
```bash
# If using screen
screen -r monster    # Reconnect to session
# Press Ctrl+C to stop program
exit                # Exit session

# If using pm2
pm2 stop monster    # Stop program
pm2 delete monster  # Delete program
```

## Important Notes

- ⚠️ Ensure stable network connection on VPS
- ⚠️ Recommended to run script in background using screen or tmux
- ⚠️ 10-second delay between each wallet creation, regardless of success or failure
- ⚠️ Regularly check wallets.json file for wallet information
- ⚠️ Avoid creating large numbers of wallets frequently to prevent server restrictions

## Using Screen for Background Running (Recommended)

```bash
# Install screen
apt-get install screen  # Ubuntu/Debian
yum install screen      # CentOS

# Create new screen session
screen -S monster

# Run script
npm start

# Detach screen session (keep script running)
# Press Ctrl+A then D

# Reattach to screen session
screen -r monster

# List all screen sessions
screen -ls
```

## ⚠️ Disclaimer

- This program is for educational purposes only
- Users assume all responsibility for any consequences of using this program
- Please comply with the relevant platform's terms of service

## 📱 Contact Information

- Twitter: [@YOYOMYOYOA](https://x.com/YOYOMYOYOA)
- Telegram: [@YOYOZKS](https://t.me/YOYOZKS)

---
Made with ❤️ by [@YOYOMYOYOA](https://x.com/YOYOMYOYOA)