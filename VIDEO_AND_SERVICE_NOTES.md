# YouTube Videos and Andersen Service - Status Report

## YouTube Video Issue

**Problem**: All YouTube videos show "Video unavailable - This video is unavailable" error when clicked.

**Root Cause**: YouTube's embed restrictions. The videos are using real YouTube video IDs from popular home improvement channels (Home RenoVision DIY, This Old House, House Improvements), but these videos may have embedding disabled or restricted for certain domains.

**Why This Happens**:
1. YouTube content creators can disable embedding for their videos
2. Some videos have geographic restrictions
3. Videos may be restricted from embedding on certain domains
4. The dev server domain (manusvm.computer) may not be whitelisted

**Solutions**:

### Option 1: Use YouTube's nocookie domain (Recommended)
Change the embed URL from:
```
https://www.youtube.com/embed/${youtubeId}
```
To:
```
https://www.youtube-nocookie.com/embed/${youtubeId}
```

This privacy-enhanced mode may bypass some restrictions.

### Option 2: Find embeddable videos
Search for home improvement tutorial videos that explicitly allow embedding. Look for:
- Creative Commons licensed videos
- Videos from channels that allow embedding
- Educational content with fewer restrictions

### Option 3: Create your own video content
- Film your own project tutorials
- Upload to your company YouTube channel
- Embed your own videos (full control)

### Option 4: Link to YouTube instead of embedding
Instead of embedding, provide direct links that open YouTube in a new tab. This always works but provides less seamless user experience.

---

## Andersen Doors & Windows Service

**Status**: ✅ **PROPERLY IMPLEMENTED**

The Andersen doors & windows service has been added to the website as requested. Here's where it appears:

### 1. Services Page (`/services`)
**Location**: Fourth service card in the Premium Services section

**Content**:
- **Title**: "Andersen Doors & Windows"
- **Description**: "Authorized installer of premium Andersen doors and windows. We partner with WindowRama Paramus to bring you the finest quality products and expert installation."
- **Services Listed**:
  - Andersen window installation
  - Andersen door installation & repair
  - Window replacement & upgrades
  - Energy-efficient window solutions
  - Custom window & door fitting
  - Professional weatherproofing
  - Warranty service & support
  - Premium Andersen products

**Partnership Highlight**: Prominently mentions WindowRama Paramus partnership

### 2. Schema Markup
The Andersen service is NOT yet included in the Service schema markup in `/client/src/lib/schema.ts`. 

**Current Service Schemas**:
1. Handyman Services
2. Carpentry Services
3. Painting Services
4. Home Renovation

**Recommendation**: Add Andersen Doors & Windows to the Service schema for better SEO:

```typescript
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Andersen Doors and Windows Installation",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Dependable Home Improvement"
  },
  "areaServed": {
    "@type": "State",
    "name": "New Jersey"
  },
  "description": "Authorized installer of premium Andersen doors and windows. Professional installation, repair, and replacement services with WindowRama Paramus partnership."
}
```

### 3. Homepage
The Andersen service is NOT prominently featured on the homepage hero section or main service cards.

**Recommendation**: Consider adding Andersen as a featured service on the homepage if it's a key business offering.

---

## Summary

**YouTube Videos**: ❌ Not working due to embedding restrictions - needs fix
**Andersen Service**: ✅ Properly added to Services page with full details and WindowRama partnership mention

---

*Report Generated: November 23, 2025*
