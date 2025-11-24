# How to Update Google Reviews

This website displays customer reviews from your Google Business Profile. Since Google doesn't provide a free public API for reviews, we use a manual update system that's simple to maintain.

## Quick Update Process

1. **Open the reviews file**: `client/public/google-reviews.json`

2. **Add a new review** by copying this template:

```json
{
  "id": "gr7",
  "author": "Customer Name",
  "rating": 5,
  "date": "2024-11-21",
  "text": "Review text goes here...",
  "source": "Google",
  "verified": true
}
```

3. **Save the file** - changes appear immediately on the website

## Field Explanations

- **id**: Unique identifier (use gr1, gr2, gr3, etc.)
- **author**: Customer's name as shown on Google
- **rating**: Star rating (1-5)
- **date**: Review date in YYYY-MM-DD format
- **text**: Full review text
- **source**: Always "Google" for Google reviews
- **verified**: Set to `true` for verified Google reviews

## Example: Adding a New Review

If you receive a new Google review from "John Smith" on November 21, 2024:

```json
[
  {
    "id": "gr7",
    "author": "John Smith",
    "rating": 5,
    "date": "2024-11-21",
    "text": "Excellent deck refinishing work! The team was professional, on time, and the results exceeded our expectations. Highly recommend Dependable Home Improvement.",
    "source": "Google",
    "verified": true
  },
  ... existing reviews ...
]
```

## Tips

- **Keep it current**: Update reviews monthly to show fresh testimonials
- **Order matters**: Put newest reviews first in the file
- **Accuracy**: Copy review text exactly as it appears on Google
- **Verification**: Only mark reviews as verified if they have the verified badge on Google

## Automatic Refresh

The website includes a "Refresh" button that lets visitors reload reviews without refreshing the page. This is useful after you update the JSON file.

## Future Enhancement

For automatic review syncing, consider these paid services:
- **Birdeye** - Automated review aggregation
- **Podium** - Review management platform
- **Grade.us** - Review monitoring service

These services provide APIs that can automatically pull new Google reviews.
