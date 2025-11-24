# Schema Markup Validation Guide

This website includes comprehensive Schema.org structured data to improve SEO and enable rich snippets in Google search results.

## Implemented Schemas

### 1. LocalBusiness Schema (Homepage)
- **Location**: Homepage (`/`)
- **Type**: LocalBusiness
- **Includes**:
  - Business name, contact info, hours
  - Geographic coordinates
  - Service area (Bergen, Passaic, Hudson, Essex, Morris counties)
  - Aggregate rating (5.0 stars)
  - Social media profiles

### 2. Service Schemas (Services Page)
- **Location**: Services page (`/services`)
- **Types**: 4 Service schemas
- **Services**:
  - Handyman Services
  - Carpentry Services
  - Painting Services
  - Home Renovation

### 3. FAQPage Schema (FAQ Page)
- **Location**: FAQ page (`/faq`)
- **Type**: FAQPage
- **Includes**: 21 question-answer pairs across 7 categories

### 4. BlogPosting Schema (Blog Posts)
- **Location**: Individual blog posts (`/blog/:slug`)
- **Type**: BlogPosting
- **Includes**:
  - Headline, image, author
  - Publisher information with logo
  - Publication and modification dates
  - Article description

## How to Validate

### Google Rich Results Test
1. Visit [Google Rich Results Test](https://search.google.com/test/rich-results)
2. Enter your website URL for each page:
   - Homepage: `https://yourdomain.com/`
   - Services: `https://yourdomain.com/services`
   - FAQ: `https://yourdomain.com/faq`
   - Blog post: `https://yourdomain.com/blog/winter-home-maintenance-checklist`
3. Click "Test URL"
4. Review results for any errors or warnings

### Schema.org Validator
1. Visit [Schema Markup Validator](https://validator.schema.org/)
2. Enter your website URL
3. Review the detected structured data
4. Fix any validation errors

### Google Search Console
1. Log into [Google Search Console](https://search.google.com/search-console)
2. Navigate to "Enhancements" section
3. Check for:
   - FAQ rich results
   - Local business information
   - Breadcrumbs
   - Article structured data

## Expected Rich Results

### In Google Search:
- **Local Business**: Business name, rating, hours, phone number
- **FAQ**: Expandable questions directly in search results
- **Blog Posts**: Article snippets with author, date, and image
- **Services**: Service listings with descriptions

## Troubleshooting

### Common Issues:
1. **Missing required fields**: Ensure all required properties are present
2. **Invalid URLs**: Check that image URLs are absolute (include domain)
3. **Date format**: Dates should be in ISO 8601 format (YYYY-MM-DD)
4. **Rating values**: Must be within valid range (0-5)

### How to Fix:
- Review schema definitions in `/client/src/lib/schema.ts`
- Update values in the schema utility functions
- Test changes with validation tools above

## Benefits

### SEO Improvements:
- Higher click-through rates from rich snippets
- Better local search visibility
- Enhanced mobile search results
- Improved voice search compatibility

### User Experience:
- Quick answers directly in search results
- More informative search listings
- Better understanding of services offered
- Easier contact information access

## Maintenance

### When to Update Schemas:
- Business information changes (hours, phone, address)
- New services added or modified
- FAQ questions updated
- Blog posts published or edited

### How to Update:
1. Edit schema functions in `/client/src/lib/schema.ts`
2. Update relevant page components
3. Re-validate with Google tools
4. Monitor Google Search Console for issues

## Additional Resources

- [Schema.org Documentation](https://schema.org/)
- [Google Search Central - Structured Data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- [JSON-LD Playground](https://json-ld.org/playground/)
