export $(cat .env | grep -v ^# | xargs)

# Pull latest changes from Git repository
git pull

# Install npm dependencies
npm install

# Reload jobs
# node jobs/reload.js

# Restart the production contest service using pm2
pm2 restart $PM2_ID 
