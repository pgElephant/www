#!/bin/bash

# Schema Validation Script
# Validates all Product and SoftwareApplication schemas have required merchant listing fields
# Run this before deployment to catch schema issues early

set -e

echo "🔍 Validating Product and SoftwareApplication schemas..."
echo ""

ERRORS=0
WARNINGS=0

# Colors
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Find all TypeScript files with structured data
SCHEMA_FILES=$(find . -name "*.tsx" -o -name "*.ts" | grep -v node_modules | grep -v .next)

# Check 1: Find schemas with Offer but missing hasMerchantReturnPolicy
echo "📋 Check 1: Validating merchant return policies..."
MISSING_RETURN_POLICY=()
for file in $SCHEMA_FILES; do
  if grep -q "@type.*Offer" "$file" 2>/dev/null; then
    if ! grep -q "hasMerchantReturnPolicy" "$file" 2>/dev/null; then
      MISSING_RETURN_POLICY+=("$file")
      ERRORS=$((ERRORS + 1))
    fi
  fi
done

if [ ${#MISSING_RETURN_POLICY[@]} -eq 0 ]; then
  echo -e "${GREEN}✓${NC} All offers have merchant return policies"
else
  echo -e "${RED}✗${NC} Files with offers missing hasMerchantReturnPolicy:"
  for file in "${MISSING_RETURN_POLICY[@]}"; do
    echo -e "  ${RED}→${NC} $file"
  done
fi
echo ""

# Check 2: Find schemas with Offer but missing shippingDetails
echo "📋 Check 2: Validating shipping details..."
MISSING_SHIPPING=()
for file in $SCHEMA_FILES; do
  if grep -q "@type.*Offer" "$file" 2>/dev/null; then
    if ! grep -q "shippingDetails" "$file" 2>/dev/null; then
      MISSING_SHIPPING+=("$file")
      ERRORS=$((ERRORS + 1))
    fi
  fi
done

if [ ${#MISSING_SHIPPING[@]} -eq 0 ]; then
  echo -e "${GREEN}✓${NC} All offers have shipping details"
else
  echo -e "${RED}✗${NC} Files with offers missing shippingDetails:"
  for file in "${MISSING_SHIPPING[@]}"; do
    echo -e "  ${RED}→${NC} $file"
  done
fi
echo ""

# Check 3: Find Product/SoftwareApplication schemas without image
echo "📋 Check 3: Validating image fields..."
MISSING_IMAGE=()
for file in $SCHEMA_FILES; do
  if grep -E "@type.*(Product|SoftwareApplication)" "$file" 2>/dev/null | grep -v "ImageObject" > /dev/null; then
    # Check if this schema has an offers section (indicating it's a merchant listing)
    if grep -q "@type.*Offer" "$file" 2>/dev/null; then
      # Check for image field (with or without quotes - handles both JSON and TypeScript)
      if ! grep -E '("image"|image:)' "$file" 2>/dev/null | grep -v "ImageObject" > /dev/null; then
        MISSING_IMAGE+=("$file")
        ERRORS=$((ERRORS + 1))
      fi
    fi
  fi
done

if [ ${#MISSING_IMAGE[@]} -eq 0 ]; then
  echo -e "${GREEN}✓${NC} All product schemas have image fields"
else
  echo -e "${RED}✗${NC} Product/SoftwareApplication schemas missing image:"
  for file in "${MISSING_IMAGE[@]}"; do
    echo -e "  ${RED}→${NC} $file"
  done
fi
echo ""

# Check 4: Verify offer URLs are present
echo "📋 Check 4: Validating offer URLs..."
MISSING_OFFER_URL=()
for file in $SCHEMA_FILES; do
  if grep -q "@type.*Offer" "$file" 2>/dev/null; then
    # Look for url field within 10 lines after Offer (handles both JSON and TypeScript)
    if ! grep -A 10 "@type.*Offer" "$file" 2>/dev/null | grep -E '("url"|url:)' 2>/dev/null; then
      MISSING_OFFER_URL+=("$file")
      WARNINGS=$((WARNINGS + 1))
    fi
  fi
done

if [ ${#MISSING_OFFER_URL[@]} -eq 0 ]; then
  echo -e "${GREEN}✓${NC} All offers have URLs"
else
  echo -e "${YELLOW}⚠${NC}  Offers missing URL field (recommended):"
  for file in "${MISSING_OFFER_URL[@]}"; do
    echo -e "  ${YELLOW}→${NC} $file"
  done
fi
echo ""

# Check 5: List all files with structured data for reference
echo "📋 Check 5: Schema inventory..."
SCHEMA_COUNT=$(echo "$SCHEMA_FILES" | xargs grep -l "application/ld+json" 2>/dev/null | wc -l | tr -d ' ')
echo -e "${GREEN}ℹ${NC}  Found $SCHEMA_COUNT files with structured data:"
echo "$SCHEMA_FILES" | xargs grep -l "application/ld+json" 2>/dev/null | while read file; do
  PRODUCT_TYPE=$(grep -E "@type.*(Product|SoftwareApplication|Organization|Article)" "$file" 2>/dev/null | head -1 | sed 's/.*@type"*: "*\([^"]*\)".*/\1/' | tr -d ',' | xargs)
  if [ -n "$PRODUCT_TYPE" ]; then
    echo -e "  ${GREEN}→${NC} $file (${PRODUCT_TYPE})"
  fi
done
echo ""

# Summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 Validation Summary"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ $ERRORS -eq 0 ]; then
  echo -e "${GREEN}✓ All schemas pass validation!${NC}"
else
  echo -e "${RED}✗ Found $ERRORS error(s)${NC}"
fi

if [ $WARNINGS -gt 0 ]; then
  echo -e "${YELLOW}⚠ Found $WARNINGS warning(s)${NC}"
fi

echo ""
echo "📖 See SCHEMA_VALIDATION_CHECKLIST.md for detailed requirements"
echo ""

# Exit with error if any errors found
if [ $ERRORS -gt 0 ]; then
  echo -e "${RED}❌ Schema validation failed!${NC}"
  echo -e "${YELLOW}💡 Tip: Add missing fields using the template in SCHEMA_VALIDATION_CHECKLIST.md${NC}"
  exit 1
else
  echo -e "${GREEN}✅ Schema validation passed!${NC}"
  exit 0
fi

