#!/bin/bash

# Define colors
RED='\033[0;31m'
NC='\033[0m' # No Color

# Pull latest changes from Git repository
git pull

# Install npm dependencies
npm install

# Build again with error handling
if npm run build; then
    echo "Build successful"
else
    echo "${RED}Error: ${NC}Failed to build"
fi

# Load variables from .env.* file
ENV_FILE="$1/.env.$NODE_ENV"
if [ -f "$ENV_FILE" ]; then
    . "$ENV_FILE"
elif [ -f "$1/.env" ]; then
    printf "${RED}Warning: ${NC}$ENV_FILE not found, falling back to .env\n"
    . "$1/.env"
else
    printf "${RED}Error: ${NC}.env file not found\n"
    
    exit 1
fi

# Restart the production contest service using pm2
if [ -n "$PM2_ID" ]; then
    pm2 restart $PM2_ID
else
    pm2 restart all
fi


