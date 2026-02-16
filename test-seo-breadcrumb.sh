#!/bin/bash

# Test script to verify Breadcrumb JSON-LD on key pages
BASE_URL="https://teachmeai.in"

echo "🔍 Verifying Breadcrumb SEO Structured Data..."
echo "==========================================="

check_page() {
    local route=$1
    local name=$2
    echo -n "📄 Checking $name ($route)... "
    
    local content=$(curl -s "$BASE_URL$route")
    if echo "$content" | grep -q "\"@type\": \"BreadcrumbList\""; then
        echo "✅ FOUND"
        # Optional: verify items count
        local count=$(echo "$content" | grep -o "\"@type\": \"ListItem\"" | wc -l)
        echo "   (Items found: $((count / 2)))" # Divided by 2 because @type appears twice per item usually in JSON-LD structure or similar
    else
        echo "❌ MISSING"
    fi
}

check_page "/" "Home"
check_page "/about" "About"
check_page "/programs" "Programs Hub"
check_page "/programs/clarity-call" "Clarity Call"
check_page "/programs/starter-30-day" "Starter Program"
check_page "/programs/growth-90-day" "Growth Program"
check_page "/blog" "Blog Index"
check_page "/frameworks/impact" "IMPACT Framework"
check_page "/frameworks/adapt" "ADAPT Framework"
check_page "/ai-diagnostic" "AI Diagnostic"

echo "==========================================="
echo "✅ SEO Breadcrumb Verification Complete"
