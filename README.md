### Kokosh NPM

Install

```bash
npm install -g kokosh@latest
```

command

```bash
kokosh push  # git add , git commit auto,  git push
kokosh pull  # git pull, npm i, pm2 restart
kokosh backups # backups all database and send telegram
```

**_is required You need add .env_**

```bash
 #mysql
HOST=<>
DATABASE=<>
MYSQL_USERNAME=<>
MYSQL_PASSWORD=<>
MYSQL_CONTAINER_NAME=<>

#settings
PM2_ID=<>

#telegram
BACKUP_BOT_TOKEN=<>
BACKUP_CHAT_ID=<>
```
