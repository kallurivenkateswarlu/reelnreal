# 🚀 QUICK START - Deploy reelnreal.com on Netlify (15 minutes)

## ⚡ What's Happening Right Now?

Your site exists on GitHub but **NOT deployed yet**. You need to connect GitHub to Netlify.

---

## 📋 STEP 1: Create Netlify Account (2 minutes)

1. Go to: https://app.netlify.com
2. Click **"Sign up"**
3. Choose **"GitHub"** to sign up with GitHub
4. Authorize Netlify to access your GitHub account
5. Done! ✅

---

## 🔗 STEP 2: Connect GitHub Repository (3 minutes)

1. In Netlify, click **"New site from Git"** (or top left "+ New site")
2. Click **"Connect to Git"**
3. Select **GitHub** as your provider
4. Find and click **"reelnreal"** repository
5. Click **"Connect reelnreal"**
6. Netlify shows build settings automatically ✅

**Build Settings Should Show:**
```
Build command:  npm run build
Publish directory: dist
```

If they show different values, update them manually.

---

## ⚙️ STEP 3: Add Environment Variables (3 minutes)

**IMPORTANT:** Before deploying, add these variables or the site will be blank!

1. In Netlify dashboard, click your site name
2. Go to **Settings** → **Build & deploy** → **Environment**
3. Click **"Edit variables"** or **"Add environment variables"**
4. Add these 3 variables:

| Name | Value |
|------|-------|
| `GEMINI_API_KEY` | `your_gemini_api_key_here` |
| `APP_URL` | `https://reelnreal.com` |
| `CONTENT_SOURCE` | `json` |

**Get GEMINI_API_KEY:**
- Go to: https://ai.google.dev/
- Create API key (free tier available)
- Copy the key
- Paste in Netlify

5. Click **"Save"**

---

## 🚀 STEP 4: Deploy (1 minute)

1. Click **"Deploy site"** button
2. Wait 2-5 minutes for build to complete
3. You'll see a **"Deploy successful"** message ✅

**Your site is now live at:**
```
https://reelnreal.netlify.app
```

Test it! ✅

---

## 🌐 STEP 5: Connect Custom Domain (5 minutes)

Now connect your custom domain `reelnreal.com`

1. In Netlify, go to **Domain settings**
2. Click **"Add custom domain"**
3. Type: `reelnreal.com`
4. Click **"Continue"**
5. You'll see instructions to update DNS

**Update DNS at Your Domain Registrar:**

**Option A: Use Netlify's Nameservers (Easiest)**
- Login to where you bought reelnreal.com (GoDaddy, Namecheap, etc.)
- Find DNS/Nameservers settings
- Replace with Netlify nameservers:
  ```
  dns1.p09.nsone.net
  dns2.p09.nsone.net
  dns3.p09.nsone.net
  dns4.p09.nsone.net
  ```
- Save changes
- Wait 5-48 hours for DNS to propagate

**Option B: Use CNAME Record (If you prefer)**
- Find CNAME settings in your registrar
- Add:
  ```
  Name: reelnreal.com
  Value: reelnreal.netlify.app
  ```
- Save changes
- Wait for propagation

**Check DNS Status:**
- Go to: https://dns.google.com
- Search: `reelnreal.com`
- Should point to Netlify

---

## ✅ Verification

After DNS propagates (5-48 hours), test these:

```
✅ https://reelnreal.netlify.app     (works immediately)
✅ https://reelnreal.com             (works after DNS updates)
```

Check:
- [ ] Site loads (not blank)
- [ ] Movies visible
- [ ] News section shows
- [ ] Box office data appears
- [ ] Language toggle works
- [ ] No errors in browser console (F12)

---

## 🆘 If Site Shows Blank Page

**This usually means:** Environment variables missing

**Fix:**
1. Go to Netlify → Site settings → Environment
2. Verify all 3 variables are set:
   - GEMINI_API_KEY ✓
   - APP_URL ✓
   - CONTENT_SOURCE ✓
3. Click "Trigger deploy" in Deploys tab
4. Wait 2-5 minutes
5. Refresh browser

---

## 📱 What to Do Now

**RIGHT NOW:**
1. ✅ Go to https://app.netlify.com
2. ✅ Sign up with GitHub
3. ✅ Connect reelnreal repository
4. ✅ Add environment variables
5. ✅ Deploy

**IN 5-48 HOURS:**
- Update DNS to point reelnreal.com to Netlify
- Test https://reelnreal.com

---

## 🎯 Expected Timeline

- **Now**: Deploy to Netlify (15 minutes)
- **Immediately**: Live at reelnreal.netlify.app
- **5-48 hours**: DNS propagates, reelnreal.com works

---

## 📞 Still Stuck?

If you get errors, check:

1. **Build failed?** → Check Netlify build log for errors
2. **Site blank?** → Verify environment variables are set
3. **DNS not working?** → Wait 24 hours, then check at dns.google.com
4. **Images not loading?** → Check network tab (F12)

See `TROUBLESHOOTING.md` for detailed solutions.

---

**Status:** Ready to deploy! Start at Step 1 above. 🚀
