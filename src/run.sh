#!/bin/bash

# Colors for terminal output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

echo -e "${GREEN}🚀 Starting Ridgewood Coffee development environment...${NC}\n"

# Check if Node.js is installed
if ! command_exists node; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js to continue.${NC}"
    echo -e "Visit: https://nodejs.org/en/download/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2)
REQUIRED_VERSION="18.0.0"

if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" = "$REQUIRED_VERSION" ]; then 
    echo -e "${GREEN}✅ Node.js version $NODE_VERSION detected${NC}"
else
    echo -e "${YELLOW}⚠️  Warning: Node.js version $NODE_VERSION detected. We recommend using version 18.0.0 or higher.${NC}"
fi

# Check if npm is installed
if ! command_exists npm; then
    echo -e "${RED}❌ npm is not installed. Please install npm to continue.${NC}"
    exit 1
fi

# Check if node_modules exists, if not run npm install
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 node_modules not found. Installing dependencies...${NC}"
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Failed to install dependencies. Please check the error messages above.${NC}"
        exit 1
    fi
    echo -e "${GREEN}✅ Dependencies installed successfully${NC}"
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo -e "${YELLOW}⚠️  .env.local file not found. Creating one with default values...${NC}"
    cat > .env.local << EOL
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
NEXT_PUBLIC_FORMSPREE_ID=your_formspree_id_here
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_key_here
EOL
    echo -e "${GREEN}✅ Created .env.local file${NC}"
    echo -e "${YELLOW}⚠️  Please update the API keys in .env.local with your actual values${NC}"
fi

# Start the development server
echo -e "\n${GREEN}🌟 Starting development server...${NC}"
echo -e "${YELLOW}The app will be available at: http://localhost:3000${NC}\n"

npm run dev 