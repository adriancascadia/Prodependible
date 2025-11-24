# How to Update Customer Reviews

Your website now features a dynamic testimonials system that's easy to update without touching any code!

## Quick Update Guide

### Step 1: Locate the Reviews File
The testimonials are stored in:
```
client/public/testimonials.json
```

### Step 2: Edit the File
Open `testimonials.json` and you'll see a structure like this:

```json
{
  "reviews": [
    {
      "id": 1,
      "name": "Karen M.",
      "service": "Residential Service",
      "rating": 5,
      "date": "2024-10-15",
      "text": "The review text goes here...",
      "verified": true
    }
  ],
  "summary": {
    "totalReviews": 6,
    "averageRating": 5.0,
    "lastUpdated": "2024-11-21"
  }
}
```

### Step 3: Add a New Review
To add a new review, copy this template and add it to the `reviews` array:

```json
{
  "id": 7,
  "name": "John D.",
  "service": "Kitchen Renovation",
  "rating": 5,
  "date": "2024-11-21",
  "text": "Your customer's review text here...",
  "verified": true
}
```

**Important:** 
- Make sure to increment the `id` number
- Use today's date in `YYYY-MM-DD` format
- Rating should be 1-5 (use 5 for Angi reviews)
- Don't forget commas between review objects!

### Step 4: Update the Summary
After adding reviews, update the summary section:
- `totalReviews`: Count of all reviews
- `averageRating`: Average of all ratings
- `lastUpdated`: Today's date

### Step 5: Save and Refresh
1. Save the file
2. The website will automatically load the new reviews
3. Visitors can click the "Refresh" button to see updates immediately

## Example: Adding a New Review

**Before:**
```json
{
  "reviews": [
    {
      "id": 6,
      "name": "Elizabeth H.",
      "service": "General Contracting",
      "rating": 5,
      "date": "2024-05-12",
      "text": "Great job...",
      "verified": true
    }
  ]
}
```

**After:**
```json
{
  "reviews": [
    {
      "id": 6,
      "name": "Elizabeth H.",
      "service": "General Contracting",
      "rating": 5,
      "date": "2024-05-12",
      "text": "Great job...",
      "verified": true
    },
    {
      "id": 7,
      "name": "Michael P.",
      "service": "Bathroom Remodel",
      "rating": 5,
      "date": "2024-11-21",
      "text": "Outstanding work! Sergey and his team transformed our outdated bathroom into a modern spa-like retreat.",
      "verified": true
    }
  ]
}
```

## Tips for Best Results

✅ **DO:**
- Keep review text concise and authentic
- Use real customer names (first name + last initial)
- Include specific service types
- Update the `lastUpdated` date when you make changes
- Keep the most recent reviews at the bottom of the list

❌ **DON'T:**
- Forget commas between objects (this breaks the JSON)
- Use special characters that need escaping (like unescaped quotes)
- Delete old reviews - they build credibility
- Change the structure of the JSON

## Troubleshooting

**Reviews not showing?**
- Check that your JSON syntax is valid (use a JSON validator online)
- Make sure all commas are in place
- Verify the file is saved in `client/public/testimonials.json`

**Need to validate your JSON?**
Copy your JSON content and paste it into: https://jsonlint.com/

## Automatic Features

The testimonials component includes:
- ✨ Automatic loading on page visit
- 🔄 Refresh button for visitors to see latest reviews
- 📱 Responsive design for all devices
- ⚡ Fallback to cached reviews if file can't be loaded
- ✅ Verified badge display
- 📅 Automatic date formatting

---

**Questions?** The website will always show reviews, even if the JSON file has issues - it falls back to the original static reviews for reliability.
