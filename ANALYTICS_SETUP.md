# Analytics Setup Guide

This website includes Google Analytics 4 and Hotjar for tracking visitor behavior and improving conversion rates.

## Google Analytics 4 Setup

### Step 1: Create GA4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click "Admin" (bottom left)
3. Click "Create Property"
4. Enter property name: "Dependable Home Improvement"
5. Select timezone and currency
6. Click "Next" → "Create"

### Step 2: Get Measurement ID

1. In your new property, click "Data Streams"
2. Click "Add stream" → "Web"
3. Enter website URL: `https://your-domain.com`
4. Click "Create stream"
5. Copy the **Measurement ID** (format: G-XXXXXXXXXX)

### Step 3: Update Website

1. Open `client/index.html`
2. Find line 18 and 23
3. Replace `G-XXXXXXXXXX` with your actual Measurement ID

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR-ID-HERE"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-YOUR-ID-HERE'); // Replace with your ID
</script>
```

### What GA4 Tracks

- Page views
- User demographics
- Traffic sources
- Device types
- Conversion events (form submissions, phone clicks)

---

## Hotjar Setup

### Step 1: Create Hotjar Account

1. Go to [Hotjar.com](https://www.hotjar.com/)
2. Sign up for free account
3. Click "Add new site"
4. Enter your website URL

### Step 2: Get Site ID

1. After creating site, you'll see your **Site ID** (6-digit number)
2. Copy this number

### Step 3: Update Website

1. Open `client/index.html`
2. Find line 30
3. Replace `XXXXXX` with your Hotjar Site ID

```javascript
h._hjSettings={hjid:123456,hjsv:6}; // Replace 123456 with your site ID
```

### What Hotjar Tracks

- **Heatmaps**: See where visitors click and scroll
- **Session Recordings**: Watch how users navigate your site
- **Conversion Funnels**: Identify where visitors drop off
- **Feedback**: Collect user opinions with surveys

---

## Privacy & GDPR Compliance

Both tools are configured to respect user privacy:

- **Google Analytics**: Uses cookieless tracking when possible
- **Hotjar**: Anonymizes personal data automatically

### Optional: Add Cookie Consent Banner

For full GDPR compliance, consider adding a cookie consent banner:

1. Use a service like [Cookiebot](https://www.cookiebot.com/) or [OneTrust](https://www.onetrust.com/)
2. Or implement a simple banner with this code (add to Home.tsx):

```tsx
// Simple cookie consent banner
{!localStorage.getItem('cookieConsent') && (
  <div className="fixed bottom-0 left-0 right-0 bg-primary text-white p-4 z-50">
    <div className="container flex items-center justify-between">
      <p>We use cookies to improve your experience.</p>
      <Button onClick={() => localStorage.setItem('cookieConsent', 'true')}>
        Accept
      </Button>
    </div>
  </div>
)}
```

---

## Testing Your Setup

### Google Analytics

1. Visit your website
2. Go to GA4 → Reports → Realtime
3. You should see yourself as an active user

### Hotjar

1. Visit your website
2. Click around and scroll
3. Go to Hotjar dashboard → Recordings
4. Wait 5-10 minutes, then check for your session

---

## Key Metrics to Monitor

### Conversion Metrics
- Form submission rate
- Phone click rate
- Email click rate
- WhatsApp chat starts

### Engagement Metrics
- Average session duration
- Pages per session
- Bounce rate
- Most viewed pages

### Traffic Sources
- Direct traffic
- Google search
- Social media
- Referrals

---

## Need Help?

- **Google Analytics**: [GA4 Help Center](https://support.google.com/analytics/)
- **Hotjar**: [Hotjar Support](https://help.hotjar.com/)
