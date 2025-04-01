#!/bin/bash

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Deploying Flash Cards app to GitHub Pages...${NC}"

# Get the repository name from git remote
REPO_NAME=$(git config --get remote.origin.url | sed -n 's/.*\/\([^/]*\)\.git$/\1/p')
echo -e "${GREEN}Detected repository name: ${REPO_NAME}${NC}"

# Check if package.json has the correct homepage
HOMEPAGE_URL=$(grep -o '"homepage": "[^"]*"' package.json | cut -d'"' -f4)
CORRECT_URL="https://hesam1993.github.io/${REPO_NAME}"

if [ "$HOMEPAGE_URL" != "$CORRECT_URL" ]; then
  echo -e "${YELLOW}Warning: The homepage URL in package.json ($HOMEPAGE_URL) does not match the expected URL ($CORRECT_URL)${NC}"
  echo -e "${YELLOW}Updating package.json with correct homepage URL...${NC}"
  
  # Use sed to replace the homepage URL in package.json
  sed -i.bak "s|\"homepage\": \"[^\"]*\"|\"homepage\": \"$CORRECT_URL\"|" package.json
  rm package.json.bak  # Remove backup file on macOS
  
  echo -e "${GREEN}Updated package.json with correct homepage URL: $CORRECT_URL${NC}"
  
  # Commit the changes
  git add package.json
  git commit -m "Update homepage URL to match repository name"
  git push origin main
  
  echo -e "${GREEN}Changes committed and pushed to GitHub${NC}"
fi

# Building the project
echo -e "${GREEN}Building the React app...${NC}"
npm run build

# Add CNAME file if you have a custom domain (uncomment if needed)
# echo "yourdomain.com" > build/CNAME

# Deploying to GitHub Pages
echo -e "${GREEN}Deploying to GitHub Pages...${NC}"
npm run deploy

echo -e "${GREEN}Deployment complete!${NC}"
echo -e "${YELLOW}Your app should be available at:${NC} $CORRECT_URL" 