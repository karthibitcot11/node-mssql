#!/bin/bash
cd /home/ubuntu/app

# Clear old PM2 processes
pm2 delete all || true

# Fetch variables from SSM Parameter Store and create .env
aws ssm get-parameters-by-path --path "/nodejs/dev/" --with-decryption --region ap-south-1 \
  --query "Parameters[*].[Name,Value]" --output text |
  sed 's/\/nodejs\/dev\///' > .env

# Install npm packages
npm install

# Start app with PM2
pm2 start npm --name node-app -- start

# Save PM2 process list
pm2 save