#!/bin/bash

# Load variables from .env file
export $(cat .env | grep -v ^# | xargs)
 
# Backup directory
BACKUP_DIR="/root/backups/"

# Create backup directory if not exists
mkdir -p "$BACKUP_DIR"

# Remove old backup files
rm -f "$BACKUP_DIR"/*.sql

# Docker container name
DOCKER_CONTAINER_NAME="my_prod_mysql"

# Backup all databases
TIMESTAMP=$(date '+%Y%m%d%H%M%S')
BACKUP_FILE="$BACKUP_DIR/all_databases_$TIMESTAMP.sql"

# List of databases to exclude
EXCLUDE_DATABASES="information_schema mysql performance_schema"

# Get list of databases
DATABASES=$(docker exec "$DOCKER_CONTAINER_NAME" mysql -u"$MYSQL_USERNAME" -p"$MYSQL_PASSWORD" -e "SHOW DATABASES WHERE \`Database\` NOT IN ('mysql', 'performance_schema', 'sys', 'information_schema', 'Database');" )

# Backup each non-system database
for DB in $DATABASES; do

    TIMESTAMP=$(date '+%Y%m%d%H%M%S')
    BACKUP_FILE="$BACKUP_DIR/${DB}_$TIMESTAMP.sql"
    docker exec "$DOCKER_CONTAINER_NAME" mysqldump -u"$MYSQL_USERNAME" -p"$MYSQL_PASSWORD" --databases "$DB" --routines --triggers --events > "$BACKUP_FILE"
    
    if [ $? -eq 0 ]; then
        echo "Backup of database $DB successfully created."
    else
        echo "Backup of database $DB failed."
    fi
done

# Send backup files via Telegram bot
for FILE in "$BACKUP_BACKUP_DIR"/*.sql; do
    curl -s -F "chat_id=$CHAT_ID" -F document=@"$FILE" https://api.telegram.org/bot$BACKUP_BOT_TOKEN/sendDocument
    if [ $? -eq 0 ]; then
        echo "Backup file $FILE successfully sent via Telegram."
    else
        echo "Failed to send backup file $FILE via Telegram."
    fi
done
