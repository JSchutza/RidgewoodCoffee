#!/bin/bash

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Ridgewood Coffee Website Setup ===${NC}"

# Create necessary directories if they don't exist
echo -e "${YELLOW}Creating required directories...${NC}"
mkdir -p public/images/gallery
mkdir -p src/components/layout
mkdir -p src/components/sections

# Check if PostCSS and Tailwind configs use module.exports
if grep -q "export default" postcss.config.js 2>/dev/null; then
  echo -e "${YELLOW}Fixing PostCSS config file syntax...${NC}"
  sed -i 's/export default/module.exports =/' postcss.config.js
fi

if grep -q "export default" tailwind.config.js 2>/dev/null; then
  echo -e "${YELLOW}Fixing Tailwind config file syntax...${NC}"
  sed -i 's/export default/module.exports =/' tailwind.config.js
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
  echo -e "${YELLOW}Installing dependencies...${NC}"
  npm install
else
  echo -e "${GREEN}Dependencies already installed${NC}"
fi

# Create placeholder hero-bg.jpg if it doesn't exist
if [ ! -f "public/images/hero-bg.jpg" ]; then
  echo -e "${YELLOW}Creating placeholder hero-bg.jpg image...${NC}"
  # Use base64 encoded placeholder brown coffee image
  echo "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==" | base64 -d > public/images/hero-bg.jpg 2>/dev/null || echo -e "${RED}Could not create placeholder image${NC}"
fi

# Create placeholder about-image.jpg if it doesn't exist
if [ ! -f "public/images/about-image.jpg" ]; then
  echo -e "${YELLOW}Creating placeholder about-image.jpg...${NC}"
  # Copy the hero image as a placeholder or create a new one
  cp public/images/hero-bg.jpg public/images/about-image.jpg 2>/dev/null || echo "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==" | base64 -d > public/images/about-image.jpg 2>/dev/null || echo -e "${RED}Could not create placeholder image${NC}"
fi

# Starting development server
echo -e "${BLUE}Starting Ridgewood Coffee website development server...${NC}"
echo -e "${GREEN}The website will be available at: http://localhost:3000${NC}"
echo -e "${YELLOW}Press Ctrl+C to stop the server${NC}"

# Start the dev server
npm start 