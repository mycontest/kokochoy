#!/bin/bash

# Get user name
user_name=$(whoami)

# Get current day and time
current_time=$(date +"%Y-%m-%d %T")

# Add changes to staging area
git add .

# Commit changes with a message including dynamic information
commit_message="Update from $user_name on $current_time"
git commit -m "$commit_message"

# Push changes to remote repository
git push