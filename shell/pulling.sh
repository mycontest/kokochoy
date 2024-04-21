# Load variables from .env.* file

. "$1/.env.$NODE_ENV"

# Pull latest changes from Git repository
git pull

# Install npm dependencies
npm install

# Build again 
npm run build

# Restart the production contest service using pm2
pm2 restart $PM2_ID 