# 🔧 Troubleshooting Guide - ReelNReal

Detailed solutions for common issues preventing your site from loading.

---

## 🔴 **Issue 1: Website Blank/Not Loading**

### Symptoms
- reelnreal.com shows blank page
- Browser console shows errors
- Netlify shows ✅ but site is blank

### Root Causes & Fixes

**A. Missing GEMINI_API_KEY**
```
Error: "GEMINI_API_KEY is required"

Fix:
1. Go to Netlify Dashboard
2. Click Site Settings → Environment
3. Add: GEMINI_API_KEY = "your_key_here"
4. Trigger new deploy
```

**B. HTML Entry Point Missing**
```
Check: index.html exists in root
Path: /index.html

Current file:
- ✅ File exists
- ✅ Has proper DOCTYPE
- ✅ Points to src/main.tsx correctly
```

**C. React Not Mounting**
```
Fix:
1. Check browser console (F12)
2. Look for "root element not found" error
3. Verify <div id="root"></div> in index.html
   - ✅ Present in line 12
```

**D. CSS/Styling Not Loading**
```
Fix:
1. Clear browser cache (Ctrl+Shift+Delete)
2. Verify CSS imports in src/index.css
3. Check Tailwind is loading properly
   - Check for file in dist/index.css after build
```

---

## 🔴 **Issue 2: Build Fails on Netlify**

### View Build Log
1. Netlify Dashboard
2. Click **Deploys** tab
3. Find failed deployment
4. Click to view **Build log**
5. Look for red error messages

### Common Build Errors

**A. "npm ERR! code ERESOLVE"**
```
Cause: Dependency conflict
Fix: In your repo root
$ npm install --legacy-peer-deps
$ npm run build
```

**B. "TypeScript errors found"**
```
Cause: Type mismatches in src/
Fix:
$ npm run lint
Fix errors shown
Push to GitHub
Netlify auto-redeploys
```

**C. "Module not found"**
```
Example: "Cannot find module '@tailwindcss/vite'"
Fix: In your repo
$ npm install
$ npm run build
```

**D. "Port already in use"**
```
This usually means:
- Another process using port 3000
- Kill it and retry
```

---

## 🔴 **Issue 3: Content Not Displaying**

### Symptoms
- Site loads but no movies/news shown
- "No data available" message

### Root Causes & Fixes

**A. site-content.json Not Found**
```
Check: File must exist in either:
  ✅ /public/site-content.json (preferred)
  ✅ /site-content.json (fallback)

Current Status:
  ✅ File found at /public/site-content.json
  ✅ Contains valid JSON data
  ✅ Has movies, news, box office data
```

**B. Fetch Failing in Browser**
```
Check browser Console (F12):
1. Open DevTools → Console tab
2. Look for errors about fetch
3. Check Network tab for /site-content.json
   - Should show 200 status
   - Should have JSON data

Fix:
- Ensure file is in /public/ directory
- Check file is valid JSON
- No parsing errors in console
```

**C. WordPress Configuration (if using)**
```
If CONTENT_SOURCE=wordpress:
1. Verify WP_API_URL is correct (must start with https://)
2. Verify WP_USERNAME and WP_APP_PASSWORD set
3. Test connection: https://your-wp-site.com/wp-json/wp/v2/posts
   - Should show JSON array of posts
   - If 401, credentials wrong
   - If 404, WordPress REST API not enabled
```

---

## 🔴 **Issue 4: Images Not Loading**

### Symptoms
- Image placeholders shown
- Unsplash/external images broken

### Root Causes & Fixes

**A. External URLs Blocked**
```
Current images use Unsplash:
https://images.unsplash.com/photo-...

If blocked:
1. Check firewall/network settings
2. Try on different network
3. Use VPN to test
```

**B. CORS Issues**
```
Cause: Cross-origin requests blocked
Sign: "Access to image at ... blocked by CORS"

Fix:
- Use proxy service: https://cors-anywhere.herokuapp.com
- Or host images locally in /public/images/
```

**C. Broken Image URLs**
```
Fix:
1. Edit site-content.json
2. Update image URLs to valid sources
3. Test in browser: right-click image → Copy URL
4. Visit URL to verify it loads
```

---

## 🔴 **Issue 5: Custom Domain Not Working**

### Symptoms
- reelnreal.com shows "site not found"
- reelnreal.netlify.app works fine

### Root Causes & Fixes

**A. DNS Not Configured**
```
Check current status:
1. Go to Netlify → Domain Management
2. Look for domain status:
   - 🟢 Netlify DNS Managed (fast)
   - 🟡 External DNS (need to update manually)

For External DNS (GoDaddy, Namecheap, etc.):
1. Login to registrar
2. Find DNS/Nameserver settings
3. Use Netlify's nameservers:
   - dns1.p09.nsone.net
   - dns2.p09.nsone.net
   - dns3.p09.nsone.net
   - dns4.p09.nsone.net
4. Save changes
5. Wait 5-48 hours for propagation
```

**B. DNS Propagation Delay**
```
Check propagation:
https://dns.google.com
Search: reelnreal.com

Status:
- Checking... (wait)
- ✅ Pointing to Netlify
```

**C. CNAME Record Setup (Alternative)**
```
If NOT using Netlify DNS:
1. Add CNAME record:
   Name: reelnreal.com
   Value: reelnreal.netlify.app
2. Or use A record if supported:
   Name: reelnreal.com
   Value: 75.2.60.5 (Netlify IP)
3. Wait for propagation
```

---

## 🔴 **Issue 6: 404 Errors / Page Not Found**

### Symptoms
- Clicking links shows 404
- Refreshing page shows 404
- Only homepage works

### Root Cause
- Missing SPA redirect configuration

### Fix
```
This is ALREADY configured in netlify.toml:

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

If still seeing 404:
1. Verify netlify.toml exists
2. Netlify Dashboard → Redirects tab
3. Should show rules configured
4. Trigger new deploy
```

---

## 🔴 **Issue 7: Memory/Timeout Issues**

### Symptoms
- Build times out
- "Build exceeded 15 minutes"
- Site loads slowly

### Fixes

**A. Optimize Bundle**
```bash
# Check bundle size
npm run build

# Remove unused dependencies
npm prune

# Audit for vulnerabilities
npm audit fix
```

**B. Increase Build Timeout**
```
In Netlify Dashboard:
1. Site Settings → Build & Deploy → Timeout
2. Increase timeout (max 40 min)
3. Save & redeploy
```

---

## ✅ Quick Verification Checklist

Run through these to confirm everything works:

```
□ npm install (no errors)
□ npm run build (completes successfully)
□ dist/ folder created with files
□ /public/site-content.json exists and valid JSON
□ .env.local has GEMINI_API_KEY set
□ Netlify environment variables configured
□ Custom domain DNS pointing to Netlify
□ https://reelnreal.netlify.app loads completely
□ https://reelnreal.com loads completely (after DNS)
□ Movie cards visible and clickable
□ News section populated
□ Box office data showing
□ Language toggle working (Telugu/English)
□ Browser console shows no errors
□ Network tab shows all images loading
```

---

## 🆘 Still Not Working?

### Step 1: Gather Diagnostic Info
```bash
# In your repo
npm --version        # Node version
npm list react       # React version
npm run build        # Full build output
```

### Step 2: Check Netlify
- **Build Log**: Full output of last deploy
- **Function Logs**: Any serverless functions
- **Deploy Preview**: Try preview deploy

### Step 3: Check GitHub
- Is repo public? (needed for Netlify)
- Are all files committed and pushed?
- Any pending changes?

### Step 4: Contact Support
- **Netlify Support**: https://support.netlify.com
- **GitHub Support**: https://support.github.com
- **Community**: https://community.netlify.com

---

## 📊 Debug Mode

### Enable Verbose Logging
```
In Netlify Environment Variables, add:
DEBUG = "*"
NODE_ENV = "development"
```

### Check Browser Console
```
F12 → Console tab
Look for:
- React/Vite errors
- Fetch failures
- Missing resources
- CORS issues
```

### Network Tab Analysis
```
F12 → Network tab
1. Refresh page
2. Check each request:
   - Status 200 = OK
   - Status 404 = File missing
   - Status 50x = Server error
3. Identify failing requests
```

---

**Last Updated:** 2026-09-10  
**Status:** Comprehensive troubleshooting guide
