#!/bin/bash

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Deploying Flash Cards app to GitHub Pages...${NC}"

# Building the project
echo -e "${GREEN}Building the React app...${NC}"
npm run build

# Add CNAME file if you have a custom domain (uncomment if needed)
# echo "yourdomain.com" > build/CNAME

# Deploying to GitHub Pages
echo -e "${GREEN}Deploying to GitHub Pages...${NC}"
npm run deploy

echo -e "${GREEN}Deployment complete!${NC}"
echo -e "${YELLOW}Your app should be available at:${NC} https://hesam1993.github.io/flash-cards" 