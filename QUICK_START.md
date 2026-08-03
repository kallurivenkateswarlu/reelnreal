# Quick Start: Connect WordPress to GitHub & Reel N Real

## 🎯 Goal
Connect your WordPress site to your GitHub repository and make the Reel N Real website pull content from WordPress instead of the JSON file.

---

## 📋 Prerequisites

Before starting, you need:
1. ✅ GitHub account logged in (kallurivenkateswarlu)
2. ✅ WordPress site running (https://your-wordpress-domain.com)
3. ✅ WordPress admin access
4. ✅ This GitHub repo (reelnreal) cloned locally or access to edit files

---

## 🔧 Setup (15 minutes)

### **Step 1: Fix WordPress (5 minutes)**

In your WordPress Admin (`https://your-wordpress-domain.com/wp-admin`):

1. **Enable HTTPS:**
   - Settings → General
   - Check both URLs start with `https://` (not `http://`)
   - Update if needed and Save

2. **Enable REST API:**
   - Settings → Permalinks
   - Select "Post name" (NOT "Plain")
   - Save Changes

3. **Install Plugins:**
   - Plugins → Add New
   - Search and install: "Application Passwords"
   - Activate

### **Step 2: Create Application Password (3 minutes)**

In WordPress Admin:

1. Users → Your Profile (e.g., "Administrator")
2. Scroll to "Application Passwords"
3. Enter name: `Reel N Real App`
4. Click "Add New Application Password"
5. **COPY the password** (looks like: `abc1 def2 ghi3 jkl4 mno5`)
6. Save it somewhere safe

### **Step 3: Update Configuration (5 minutes)**

**Option A: Online (Easiest - if you can edit on GitHub)**

1. Go to your GitHub repo: https://github.com/kallurivenkateswarlu/reelnreal
2. Create a new file or edit `.env.local`:
3. Fill in:
   ```
   CONTENT_SOURCE=wordpress
   WP_API_URL=https://your-actual-wordpress-domain.com
   WP_USERNAME=your_wordpress_username
   WP_APP_PASSWORD=abc1def2ghi3jkl4mno5
   ```
4. Commit with message: "Configure WordPress connection"

**Option B: Locally (If cloned to your computer)**

1. Open the repo folder
2. Copy `.env.example` to `.env.local`
3. Edit `.env.local` with your details:
   ```
   CONTENT_SOURCE=wordpress
   WP_API_URL=https://your-wordpress-domain.com
   WP_USERNAME=your_wordpress_username
   WP_APP_PASSWORD=abc1def2ghi3jkl4mno5
   ```
4. Save file (DO NOT COMMIT - add to .gitignore)
5. For Netlify, add these as environment variables instead

---

## ✅ Test It Works

### **Test 1: Check REST API**

Open your browser and visit:
```
https://your-wordpress-domain.com/wp-json/wp/v2/posts
```

You should see JSON data. If error, re-do Step 1.

### **Test 2: Check Custom Post Types**

Visit (after you add movies in WordPress):
```
https://your-wordpress-domain.com/wp-json/wp/v2/movies
```

Should return empty array `[]` or list of movies.

### **Test 3: Add Sample Content**

In WordPress Admin:

1. Go to **Movies** → **Add New**
2. Title: "Test Movie"
3. Content: "This is a test"
4. Publish
5. Test API again in browser (should see the movie in JSON)

---

## 🚀 Deploy to Production

### **If using Netlify:**

1. Go to Netlify Dashboard: https://app.netlify.com
2. Select your site (reelnreal)
3. Go to **Site Settings** → **Build & Deploy** → **Environment**
4. Click **Edit variables**
5. Add these environment variables:
   ```
   WP_API_URL=https://your-wordpress-domain.com
   WP_USERNAME=your_wordpress_username
   WP_APP_PASSWORD=abc1def2ghi3jkl4mno5
   CONTENT_SOURCE=wordpress
   ```
6. Click **Save**
7. Go to **Deploys** → Click **Trigger deploy** → **Deploy site**
8. Your site will now use WordPress content!

### **If running locally:**

```bash
# Create .env.local file with your credentials
cp .env.example .env.local
# Edit .env.local with your WordPress details

# Load environment variables and run your app
export CONTENT_SOURCE=wordpress
npm start
# or
npm run dev
```

---

## 📱 Merge Multiple WordPress Accounts (If Needed)

If you have 2 WordPress sites and want to consolidate:

### **Option 1: Use the Better Site, Delete the Other**

1. Login to both sites
2. Choose which one you want to keep
3. Update your GitHub config to point to the good one
4. Delete the other site from your hosting (Bluehost dashboard)

### **Option 2: Migrate Content Between Sites**

1. From **Site A** (old): **Tools** → **Export** (export all content)
2. To **Site B** (new): **Tools** → **Import** → **WordPress** (import the file)
3. Now Site B has all content from Site A
4. Update GitHub config to Site B
5. Delete Site A

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Site does not support app passwords" | See `WORDPRESS_TROUBLESHOOTING.md` |
| API returns 404 | Check WordPress URL is correct & has `https://` |
| API returns empty | Create sample content in WordPress first |
| Changes not showing on website | Redeploy or wait for auto-deploy (5 min) |
| Two WordPress sites | See "Merge Multiple Accounts" above |
| Authentication error (401) | Verify username and app password are correct |

---

## 📞 Need Help?

**Check these files in your repo:**

1. **WORDPRESS_TROUBLESHOOTING.md** — Detailed error fixes
2. **wordpress-api-config-v2.js** — Updated API config (handles auth)
3. **.env.example** — Template for environment variables

**If API still not working:**
- Your WordPress domain: `________________`
- Your WordPress username: `________________`
- Error message: `________________`
- Screenshot or exact error: `________________`

---

## ✨ What Happens Next

Once connected:

1. ✅ You can create/edit content in WordPress
2. ✅ Changes appear on reelnreal.com automatically
3. ✅ Use mobile WordPress app to update content anywhere
4. ✅ Team members can edit content without touching code
5. ✅ Content is cached for performance

---

## 🎉 Success!

Your WordPress + GitHub + Reel N Real setup is complete!

**Next steps:**
- [ ] Create sample movies in WordPress
- [ ] Create sample news articles
- [ ] Create box office entries
- [ ] Test on your phone with WordPress app
- [ ] Invite team members to WordPress
- [ ] Update your actual content

---

## 📚 Files Reference

| File | Purpose |
|------|---------|
| `.env.example` | Template for environment variables |
| `.env.local` | Your local credentials (don't commit) |
| `wordpress-api-config-v2.js` | API connection logic |
| `content-fetcher.js` | Chooses between JSON or WordPress |
| `QUICK_START.md` | This file |
| `WORDPRESS_TROUBLESHOOTING.md` | Error solutions |
| `WORDPRESS_INTEGRATION_STEPS.md` | Full setup guide |

---

Questions? Check the troubleshooting guide or contact support!
