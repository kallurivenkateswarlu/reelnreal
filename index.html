# WordPress Integration - Step by Step

## ✅ What's Ready

Your GitHub branch `wordpress-cms-integration` now includes:

1. **wordpress-api-config.js** - Handles all WordPress API communication
2. **content-fetcher.js** - Switches between local JSON and WordPress automatically
3. **wordpress-setup-guide.md** - Complete setup instructions
4. **This file** - Implementation checklist

---

## 🚀 IMMEDIATE ACTIONS (Do These First)

### Step 1: Set Up WordPress Hosting (30 minutes)
- [ ] Go to https://www.bluehost.com/wordpress
- [ ] Choose plan ($2.95-6/month recommended)
- [ ] Complete installation
- [ ] Receive WordPress admin URL and credentials via email
- [ ] Login to `/wp-admin`

### Step 2: Install Required Plugins (10 minutes)
In WordPress Admin:
- [ ] **Plugins** → **Add New** 
- [ ] Search and install: **"Code Snippets"**
- [ ] Search and install: **"Advanced Custom Fields (ACF)"** (free version)
- [ ] Activate all plugins
- [ ] Verify REST API is enabled (**Settings** → **Permalinks** → Select any option except "Plain")

### Step 3: Create Custom Post Types (15 minutes)
In WordPress Admin:
- [ ] Go to **Snippets** → **Add New**
- [ ] Copy code from `wordpress-setup-guide.md` (Section 2.2)
- [ ] Paste and activate the code snippet
- [ ] Refresh WordPress dashboard
- [ ] You should now see **Movies**, **News**, **Box Office** menu items

### Step 4: Add Custom Fields (20 minutes)
In WordPress Admin:
- [ ] Go to **ACF** (Advanced Custom Fields)
- [ ] Create field group for "Movie Details"
- [ ] Add these fields:
  ```
  - genre (Text)
  - rating (Text)
  - cast (Text Area)
  - director (Text)
  - collections (Text)
  - status (Text)
  - release_date (Date)
  ```
- [ ] Assign to post type: Movie
- [ ] Repeat for News and Box Office post types

### Step 5: Create Sample Content (10 minutes)
In WordPress Admin:
- [ ] Go to **Movies** → **Add New**
- [ ] Title: "Peddi"
- [ ] Fill in custom fields with data from your site-content.json
- [ ] Publish
- [ ] Repeat for 2-3 more movies

### Step 6: Test WordPress API (5 minutes)
In your browser, visit:
```
https://your-wordpress-domain.com/wp-json/wp/v2/movies
```

You should see JSON response with your movies. ✅

---

## 💻 DEVELOPMENT SETUP

### Step 7: Update Local Configuration

Edit `wordpress-api-config.js`:

```javascript
const WP_API_CONFIG = {
  // Change this to your WordPress URL
  baseUrl: 'https://your-wordpress-domain.com',
  // Rest stays the same...
};
```

### Step 8: Update index.html

Replace the old site-content.json fetch with new imports:

**OLD:**
```javascript
// Loading from site-content.json
fetch('./site-content.json')
  .then(res => res.json())
  .then(data => {
    // use data
  })
```

**NEW:**
```javascript
import { getContentData } from './content-fetcher.js';

// Automatically uses WordPress or JSON based on CONTENT_SOURCE
const data = await getContentData();
```

### Step 9: Environment Configuration

Create `.env` file (don't commit to Git):
```
CONTENT_SOURCE=wordpress
WP_API_URL=https://your-wordpress-domain.com
```

Create `.env.local` for development (don't commit):
```
CONTENT_SOURCE=json
```

---

## 🔄 NETLIFY DEPLOYMENT

### Step 10: Update Netlify Build Settings

In Netlify Dashboard:
- [ ] Go to **Site Settings** → **Build & Deploy** → **Build settings**
- [ ] Update build command if using environment variables
- [ ] Add environment variables:
  ```
  CONTENT_SOURCE=wordpress
  WP_API_URL=https://your-wordpress-domain.com
  ```

### Step 11: Deploy to Netlify

```bash
# Commit your changes
git add .
git commit -m "Add WordPress CMS integration"
git push origin wordpress-cms-integration

# Create Pull Request on GitHub
# Review changes
# Merge to main when ready

# Netlify will auto-deploy from main branch
```

---

## 📱 MOBILE UPDATES (FINAL STEP)

### Step 12: Install WordPress Mobile App

**iOS:**
1. Open App Store
2. Search "WordPress"
3. Install official WordPress app
4. Login with your WordPress credentials

**Android:**
1. Open Play Store
2. Search "WordPress"
3. Install official WordPress app
4. Login with your WordPress credentials

### Step 13: Test Mobile Updates

1. Open WordPress app on phone
2. Create a new movie post
3. Visit reelnreal.com on desktop
4. Your new movie should appear! ✅

---

## 🐛 TROUBLESHOOTING

### API Returns 404 or No Data?
**Solution:**
1. Check WordPress URL is correct in `wordpress-api-config.js`
2. Verify REST API is enabled: **Settings** → **Permalinks** → Set to anything except "Plain"
3. Check post type is set to `show_in_rest: true`

### CORS Errors in Browser Console?
**Solution:**
1. Install "WP CORS" plugin in WordPress
2. Or add this to WordPress `wp-config.php`:
```php
header('Access-Control-Allow-Origin: *');
```

### Changes Not Showing on reelnreal.com?
**Solution:**
1. Netlify caches content
2. Either:
   - Manual deploy in Netlify dashboard, OR
   - Set up webhook for automatic redeploy on WordPress publish

### WordPress Too Slow?
**Solution:**
1. Implement caching (already in `wordpress-api-config.js`)
2. Consider CDN like Cloudflare
3. Upgrade WordPress hosting plan

---

## 📊 MONITORING & MAINTENANCE

### Weekly Tasks:
- [ ] Check WordPress is running
- [ ] Verify Netlify deployments succeeded
- [ ] Test mobile app updates working

### Monthly Tasks:
- [ ] Update WordPress plugins
- [ ] Check WordPress backups
- [ ] Review Netlify analytics

---

## 🎯 NEXT FEATURES (Optional)

Once WordPress is working:

1. **Automatic Image Optimization** - WordPress handles image resizing
2. **SEO Plugin** - Yoast SEO for better search rankings
3. **Multi-language Support** - WordPress multilingual plugins
4. **User Roles** - Create editor role for content team
5. **Scheduled Posts** - Schedule movie releases, news ahead of time
6. **Content Categories** - Better organization in WordPress
7. **Webhook Integration** - Auto-trigger Netlify builds on publish

---

## 📞 SUPPORT

**Stuck?** Check:
1. WordPress error logs: **Dashboard** → **Tools** → **Site Health**
2. Netlify build logs: Dashboard → **Deploys** → Click failed deploy
3. Browser console for JavaScript errors (F12)

---

## ✨ FINAL CHECKLIST

- [ ] WordPress hosting purchased & installed
- [ ] Plugins installed (Code Snippets, ACF)
- [ ] Custom post types created
- [ ] Sample content added to WordPress
- [ ] WordPress API tested in browser
- [ ] Local code updated with new config
- [ ] Environment variables set in Netlify
- [ ] Code deployed to main branch
- [ ] Netlify deployment successful
- [ ] Mobile app installed & tested
- [ ] Content updated via mobile app
- [ ] Changes visible on reelnreal.com

**Once all ✅, you're done!** 🎉

