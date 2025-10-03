# Google Merchant Listings Schema Validation Checklist

## Purpose
This checklist ensures all Product and SoftwareApplication schemas meet Google's merchant listing requirements and prevent validation errors.

## Critical Required Fields

### For ALL Products and SoftwareApplication with Offers

#### 1. **Image** (REQUIRED)
```json
"image": [
  "https://www.pgelephant.com/og-image.jpg",
  "https://www.pgelephant.com/logo.png"
]
```
- Must be an array or single string
- Must be full URL (not relative path)
- Should include multiple images when possible

#### 2. **Offer with Complete Fields** (REQUIRED)
```json
"offers": {
  "@type": "Offer",
  "price": "0",
  "priceCurrency": "USD",
  "availability": "https://schema.org/InStock",
  "url": "https://www.pgelephant.com/download",
  
  // REQUIRED for merchant listings
  "hasMerchantReturnPolicy": {
    "@type": "MerchantReturnPolicy",
    "applicableCountry": "US",
    "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
    "merchantReturnDays": 30,
    "returnMethod": "https://schema.org/ReturnByMail",
    "returnFees": "https://schema.org/FreeReturn"
  },
  
  // REQUIRED for merchant listings
  "shippingDetails": {
    "@type": "OfferShippingDetails",
    "shippingRate": {
      "@type": "MonetaryAmount",
      "value": "0",
      "currency": "USD"
    },
    "shippingDestination": {
      "@type": "DefinedRegion",
      "addressCountry": "US"
    },
    "deliveryTime": {
      "@type": "ShippingDeliveryTime",
      "handlingTime": {
        "@type": "QuantitativeValue",
        "minValue": 0,
        "maxValue": 0,
        "unitCode": "DAY"
      },
      "transitTime": {
        "@type": "QuantitativeValue",
        "minValue": 0,
        "maxValue": 0,
        "unitCode": "DAY"
      }
    }
  }
}
```

## Files to Check (Current Status: ✅ All Fixed)

### ✅ Core Schema Components
- [x] `/www/components/SEO/ProductSchema.tsx` - **FIXED** ✅
  - Added `image` field
  - Added `hasMerchantReturnPolicy`
  - Added `shippingDetails`

- [x] `/www/components/SEO/AdvancedSEO.tsx` - **FIXED** ✅
  - Added `image` field
  - Added `hasMerchantReturnPolicy`
  - Added `shippingDetails`

- [x] `/www/components/SEO/OrganizationSchema.tsx` - **NO OFFERS** ✅
  - Organization schema doesn't need these fields

### ✅ Page-Level Schemas
- [x] `/www/app/layout.tsx` - **FIXED** ✅
  - Main SoftwareApplication schema
  - Added all required fields

- [x] `/www/app/ram/page.tsx` - **FIXED** ✅
  - RAM Product schema
  - Added all required fields

- [x] `/www/app/page.tsx` - Uses ProductSchema component ✅
  - Inherits fixes from ProductSchema.tsx

### Pages Without Product Schemas (No Action Needed)
- `/www/app/rale/page.tsx` - No structured data
- `/www/app/fauxdb/page.tsx` - No structured data
- `/www/app/pgraft/page.tsx` - No structured data

## Validation Process

### Before Adding New Product Schemas

1. **Always include image field**
   ```typescript
   "image": [
     "https://www.pgelephant.com/og-image.jpg",
     "https://www.pgelephant.com/logo.png"
   ]
   ```

2. **Always include complete offer with policies**
   - Copy the complete offer structure from ProductSchema.tsx
   - Never create minimal offers without return/shipping policies

3. **Use existing components when possible**
   - Prefer `ProductSchema` component over inline schemas
   - Use `AdvancedSEO` component for complex pages

### Testing New Schemas

1. **Google Rich Results Test**
   ```
   https://search.google.com/test/rich-results
   ```
   - Test URL after deployment
   - Verify all required fields show green checkmarks
   - Check for warnings and resolve them

2. **Schema.org Validator**
   ```
   https://validator.schema.org/
   ```
   - Paste JSON-LD directly
   - Verify no errors or warnings

3. **Google Search Console**
   ```
   https://search.google.com/search-console
   ```
   - Check "Merchant listings" report weekly
   - Monitor for new issues
   - Request validation after fixes

## Common Mistakes to Avoid

❌ **DON'T DO THIS:**
```json
"offers": {
  "@type": "Offer",
  "price": "0",
  "priceCurrency": "USD"
}
// Missing: url, hasMerchantReturnPolicy, shippingDetails
```

❌ **DON'T DO THIS:**
```json
"@type": "SoftwareApplication",
"name": "Product Name",
// Missing: image field
"offers": { ... }
```

✅ **DO THIS:**
```json
{
  "@type": "SoftwareApplication",
  "name": "Product Name",
  "image": ["url1", "url2"],
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "url": "https://...",
    "hasMerchantReturnPolicy": { ... },
    "shippingDetails": { ... }
  }
}
```

## Automated Checks

### Run Before Deployment
```bash
# Check for schemas with offers but missing policies
cd www
grep -r "@type.*Offer" --include="*.tsx" --include="*.ts" | \
  xargs -I {} grep -L "hasMerchantReturnPolicy" {}

# Check for Product/SoftwareApplication without images
grep -r "@type.*(Product|SoftwareApplication)" --include="*.tsx" --include="*.ts" | \
  xargs -I {} grep -L '"image"' {}
```

## Recovery Checklist

If Google reports new merchant listing errors:

1. [ ] Run automated checks above
2. [ ] Identify affected files from error report
3. [ ] Add missing `image` field
4. [ ] Add complete `hasMerchantReturnPolicy` object
5. [ ] Add complete `shippingDetails` object
6. [ ] Test with Rich Results Test tool
7. [ ] Deploy changes
8. [ ] Wait 24-48 hours
9. [ ] Request validation in Google Search Console
10. [ ] Monitor for resolution

## Schema Template (Copy-Paste Ready)

```typescript
// Complete Product/SoftwareApplication Schema Template
const productSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication", // or "Product"
  "name": "Product Name",
  "description": "Product description",
  "url": "https://www.pgelephant.com/product",
  
  // REQUIRED: Image field
  "image": [
    "https://www.pgelephant.com/og-image.jpg",
    "https://www.pgelephant.com/logo.png"
  ],
  
  // Other fields (applicationCategory, operatingSystem, etc.)
  "applicationCategory": "DatabaseApplication",
  
  // REQUIRED: Complete offer with all policies
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "url": "https://www.pgelephant.com/download",
    
    "hasMerchantReturnPolicy": {
      "@type": "MerchantReturnPolicy",
      "applicableCountry": "US",
      "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
      "merchantReturnDays": 30,
      "returnMethod": "https://schema.org/ReturnByMail",
      "returnFees": "https://schema.org/FreeReturn"
    },
    
    "shippingDetails": {
      "@type": "OfferShippingDetails",
      "shippingRate": {
        "@type": "MonetaryAmount",
        "value": "0",
        "currency": "USD"
      },
      "shippingDestination": {
        "@type": "DefinedRegion",
        "addressCountry": "US"
      },
      "deliveryTime": {
        "@type": "ShippingDeliveryTime",
        "handlingTime": {
          "@type": "QuantitativeValue",
          "minValue": 0,
          "maxValue": 0,
          "unitCode": "DAY"
        },
        "transitTime": {
          "@type": "QuantitativeValue",
          "minValue": 0,
          "maxValue": 0,
          "unitCode": "DAY"
        }
      }
    }
  }
}
```

## Last Updated
- Date: 2025-10-03
- Status: All schemas validated and fixed
- Next Review: Before adding any new product pages

## Contact
If you add new product schemas, ensure this checklist is followed and update this document with the new file locations.

