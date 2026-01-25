#!/bin/bash

# Quick Production Deployment Script
# Usage: bash deploy-production.sh

set -e  # Exit on error

echo "🚀 TeachMeAI Production Deployment Script"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Verify we're in the correct directory
echo -e "${BLUE}Step 1: Verifying directory...${NC}"
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: package.json not found. Are you in the home site directory?${NC}"
    exit 1
fi

if ! grep -q "teachmeai-home-site" package.json; then
    echo -e "${RED}Error: This doesn't appear to be the home site directory.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Correct directory confirmed${NC}"
echo ""

# Step 2: Check for uncommitted changes
echo -e "${BLUE}Step 2: Checking Git status...${NC}"
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo -e "${YELLOW}Git not initialized. Initializing...${NC}"
    git init
    echo -e "${GREEN}✓ Git initialized${NC}"
fi

if [[ -n $(git status -s) ]]; then
    echo -e "${YELLOW}Uncommitted changes found. Adding and committing...${NC}"
    git add .
    git commit -m "Production deployment $(date +%Y-%m-%d\ %H:%M:%S)"
    echo -e "${GREEN}✓ Changes committed${NC}"
else
    echo -e "${GREEN}✓ No uncommitted changes${NC}"
fi
echo ""

# Step 3: Check for required environment variables
echo -e "${BLUE}Step 3: Checking environment variables...${NC}"
if [ ! -f ".env.local" ]; then
    echo -e "${RED}Error: .env.local not found${NC}"
    echo "Please create .env.local with required variables."
    exit 1
fi

REQUIRED_VARS=("GEMINI_API_KEY" "JWT_SECRET" "RESEND_API_KEY")
MISSING_VARS=()

for VAR in "${REQUIRED_VARS[@]}"; do
    if ! grep -q "^${VAR}=" .env.local; then
        MISSING_VARS+=("$VAR")
    fi
done

if [ ${#MISSING_VARS[@]} -ne 0 ]; then
    echo -e "${RED}Error: Missing required environment variables:${NC}"
    printf '%s\n' "${MISSING_VARS[@]}"
    exit 1
fi

echo -e "${GREEN}✓ All required environment variables present${NC}"
echo ""

# Step 4: Check for GitHub remote
echo -e "${BLUE}Step 4: Checking GitHub remote...${NC}"
if ! git remote | grep -q origin; then
    echo -e "${YELLOW}No GitHub remote found.${NC}"
    echo "Please add your GitHub repository:"
    echo "  git remote add origin https://github.com/YOUR_USERNAME/teachmeai-home-site.git"
    echo ""
    echo "Then run this script again."
    exit 1
fi

REMOTE_URL=$(git remote get-url origin)
echo -e "${GREEN}✓ GitHub remote configured: ${REMOTE_URL}${NC}"
echo ""

# Step 5: Push to GitHub
echo -e "${BLUE}Step 5: Pushing to GitHub...${NC}"
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo "Pushing branch: $CURRENT_BRANCH"

if git push origin $CURRENT_BRANCH; then
    echo -e "${GREEN}✓ Successfully pushed to GitHub${NC}"
else
    echo -e "${RED}Error: Failed to push to GitHub${NC}"
    echo "Please check your GitHub credentials and repository access."
    exit 1
fi
echo ""

# Step 6: Deployment instructions
echo -e "${GREEN}=========================================="
echo "✅ Pre-deployment checks complete!"
echo "==========================================${NC}"
echo ""
echo "Next steps:"
echo ""
echo "1. ${BLUE}Deploy to Vercel:${NC}"
echo "   • Go to https://vercel.com/new"
echo "   • Import repository: $(basename $REMOTE_URL .git)"
echo "   • Add environment variables (see .env.local)"
echo "   • Click Deploy"
echo ""
echo "2. ${BLUE}Configure Custom Domain:${NC}"
echo "   • In Vercel: Settings → Domains"
echo "   • Add: teachmeai.in"
echo "   • Update DNS records as shown by Vercel"
echo ""
echo "3. ${BLUE}Environment Variables to Add in Vercel:${NC}"
echo "   ✓ GEMINI_API_KEY"
echo "   ✓ JWT_SECRET"
echo "   ✓ RESEND_API_KEY"
echo "   ✓ NEXT_PUBLIC_BASE_URL=https://teachmeai.in"
echo "   ✓ NEXT_PUBLIC_INTAKE_APP_URL=https://intake.teachmeai.in"
echo "   ✓ NEXT_PUBLIC_QUIZ_WEBHOOK_URL (optional)"
echo ""
echo "4. ${BLUE}Test Production Site:${NC}"
echo "   • Wait for DNS propagation (5-30 min)"
echo "   • Visit https://teachmeai.in"
echo "   • Test ChatQuiz conversation"
echo "   • Verify email delivery"
echo ""
echo -e "${GREEN}For detailed instructions, see:${NC}"
echo "  ./PRODUCTION_DEPLOYMENT_GUIDE.md"
echo ""
echo -e "${BLUE}Happy deploying! 🚀${NC}"
