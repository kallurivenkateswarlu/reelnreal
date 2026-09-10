# 🚀 Deployment Guide - ReelNReal

Complete guide to deploy **reelnreal.com** on Netlify from GitHub.

---

## ✅ Prerequisites

- ✅ GitHub account (you have this)
- ✅ Netlify account (free at https://app.netlify.com)
- ✅ Repository: `kallurivenkateswarlu/reelnreal`
- ✅ Node.js 16+ (for local testing)

---

## 📋 Deployment Checklist

### **Step 1: Connect GitHub to Netlify** (5 minutes)

1. Go to https://app.netlify.com
2. Click **"Connect to Git"** or **"New site from Git"**
3. Select **GitHub** as provider
4. Authorize Netlify to access your GitHub account
5. Search for **`reelnreal`** repository
6. Click **"Connect"**

### **Step 2: Configure Build Settings** (5 minutes)

In Netlify, set these values:

| Field | Value |
|-------|-------|
| **Build Command** | `npm run build` |
| **Publish Directory** | `dist` |
| **Node Version** | `18.x` or `20.x` |

### **Step 3: Add Environment Variables** (10 minutes)

1. In Netlify Dashboard, go to your site
2. Click **Site Settings** → **Build & Deploy** → **Environment**
3. Click **"Edit variables"** or **"Add environment variables"**

Add these variables:

```
GEMINI_API_KEY = "your_gemini_api_key_here"
APP_URL = "https://reelnreal.com"
CONTENT_SOURCE = "json"
```

**Optional (if using WordPress):**
```
WP_API_URL = "https://your-wordpress-domain.com"
WP_USERNAME = "your_username"
WP_APP_PASSWORD = "your_app_password"
```

4. Click **"Save"**

### **Step 4: Configure Custom Domain** (10 minutes)

1. In Netlify Dashboard, go to **Domain Management**
2. Click **"Add custom domain"**
3. Enter **`reelnreal.com`**
4. Follow the DNS setup instructions:
   - Update your domain registrar's DNS settings
   - Point to Netlify's nameservers OR add CNAME record
5. Wait 5-30 minutes for DNS to propagate

### **Step 5: Trigger Initial Deploy** (3 minutes)

1. In Netlify, go to **Deploys**
2. Click **"Trigger deploy"** → **"Deploy site"**
3. Wait for build to complete (usually 2-5 minutes)
4. Check the deploy log for errors

---

## 🔍 Verify Deployment

### **Test 1: Check Build Success**
- Go to Netlify **Deploys** tab
- Latest deploy should show ✅ **Published**
- Check build log for errors

### **Test 2: Visit Your Site**
```
https://reelnreal.netlify.app    (Netlify URL)
https://reelnreal.com            (Custom domain - after DNS)
```

### **Test 3: Check Content Loads**
- Movie cards should display
- News section should populate
- Box office data should appear
- Try switching to Telugu (if language toggle works)

---

## ⚠️ Troubleshooting

### Issue: Build Fails

**Check:**
1. Go to Netlify **Deploys** → click failed deploy
2. Scroll to **Build log** section
3. Look for error messages

**Common Fixes:**
```bash
# Missing dependencies
npm install

# Build errors
npm run lint  # Check TypeScript errors

# Port conflicts
# Netlify uses port 3000 automatically
```

### Issue: Site Shows Blank Page

**Causes:**
1. GEMINI_API_KEY not set
2. site-content.json not loading
3. HTML entry point (index.html) missing

**Fix:**
1. Verify `.env` variables in Netlify
2. Check `public/site-content.json` exists
3. Clear browser cache: `Ctrl+Shift+Delete`

### Issue: reelnreal.com DNS Not Working

**Check:**
1. Is DNS propagation complete? (wait up to 48 hours)
2. Check DNS records: https://dns.google.com
3. Verify CNAME or nameservers point to Netlify

**Fix:**
- Go to your domain registrar (GoDaddy, Namecheap, etc.)
- Update DNS settings per Netlify instructions
- Test with: `nslookup reelnreal.com`

### Issue: Images Not Loading

**Cause:** External image URLs blocked

**Fix:**
- Change image URLs to local images in `/public`
- Or use a reliable CDN (Unsplash, Cloudinary)

---

## 🔑 Environment Variables Explained

| Variable | Purpose | Example |
|----------|---------|----------|
| `GEMINI_API_KEY` | Google AI API for features | `AIzaSyD...` |
| `APP_URL` | Your site URL | `https://reelnreal.com` |
| `CONTENT_SOURCE` | Where to load data from | `json` or `wordpress` |
| `WP_API_URL` | WordPress site (optional) | `https://wp.example.com` |
| `WP_USERNAME` | WordPress user (optional) | `admin` |
| `WP_APP_PASSWORD` | WordPress password (optional) | `abc1 def2 ghi3...` |

---

## 🔄 Continuous Deployment

**After setup, deployment is automatic:**

1. Make changes in GitHub
2. Push to `main` branch
3. Netlify automatically builds and deploys
4. Site updates in 2-5 minutes

**To disable auto-deploy:**
- Go to **Site Settings** → **Build & Deploy** → **Deploy contexts**
- Toggle off **Auto publish** (not recommended)

---

## 🆘 Need Help?

### Check Netlify Logs
- **Deploys Tab**: See all deployments
- **Build Log**: Click deploy to view build output
- **Functions**: Check if serverless functions run

### Common Resources
- Netlify Docs: https://docs.netlify.com
- GitHub Integration: https://docs.netlify.com/integrations/github/
- Environment Variables: https://docs.netlify.com/configure-builds/environment-variables/

### Contact Support
- Netlify Support: https://support.netlify.com
- GitHub Support: https://support.github.com

---

## 📊 Performance Optimization (Optional)

```bash
# Enable Gzip compression (automatic on Netlify)
# Enable caching headers
# Use CDN (automatic on Netlify)

# Optimize images
npm install -D imagemin
```

---

## 🎉 Deployment Complete!

Once complete, you should have:

✅ Live site at https://reelnreal.com  
✅ Auto-deploys from GitHub  
✅ Environment variables configured  
✅ Custom domain connected  
✅ Content loading from JSON (or WordPress)  

---

**Last Updated:** 2026-09-10  
**Status:** Ready for production
