# Fix: "Site Does Not Support Application Password Authentication"

## ❌ The Problem
WordPress is rejecting authentication via application passwords. This prevents:
- Connecting from GitHub
- API access from external apps
- Mobile app synchronization

## ✅ Solution Steps

### **STEP 1: Check WordPress Version (5 minutes)**

1. Login to WordPress Admin: `https://your-wordpress-url.com/wp-admin`
2. Go to **Dashboard** → Bottom right, check WordPress version
3. **Required: WordPress 5.6 or higher**
   - If older: Contact your hosting provider to upgrade

### **STEP 2: Enable Application Passwords (10 minutes)**

In WordPress Admin, follow this sequence:

#### **2.1 Enable REST API**
1. Go to **Settings** → **Permalinks**
2. Select anything EXCEPT **"Plain"** (e.g., "Post name")
3. Click **Save Changes**
4. WordPress will regenerate `.htaccess`

#### **2.2 Enable HTTPS (SSL Certificate)**
1. Go to **Settings** → **General**
2. Check both URLs start with `https://` (not `http://`)
   - WordPress Address: `https://your-site.com`
   - Site Address: `https://your-site.com`
3. If still `http://`, you need to:
   - **For Bluehost**: Dashboard → **SSL Certificate** → Enable free SSL
   - Contact your hosting for help

#### **2.3 Install & Activate Required Plugins**
1. **Plugins** → **Add New**
2. Search and install: **"Application Passwords"**
3. If not available, install: **"REST API Authentication"**
4. **Activate** the plugin

#### **2.4 Enable Application Passwords in wp-config.php**
1. Go to **Plugins** → **Code Snippets** (or install it)
2. **Add New Snippet**
3. Paste this code:

```php
<?php
// Enable Application Passwords
add_filter('wp_is_application_passwords_available', '__return_true');

// Ensure REST API is enabled
add_action('rest_api_init', function() {
    // Enable REST API for all users
    remove_filter('rest_pre_dispatch', 'rest_authentication_errors', 10);
    add_filter('rest_authentication_errors', function($result) {
        if (empty($result)) {
            return true;
        }
        return $result;
    }, 99);
});
?>
```

4. Click **Activate Snippet**

### **STEP 3: Create Application Password (5 minutes)**

1. Go to WordPress Admin
2. **Users** → Your profile (e.g., "Administrator")
3. Scroll down to **Application Passwords** section
4. Enter name: `Reel N Real App`
5. Click **Add New Application Password**
6. You'll get a password like: `abc1 def2 ghi3 jkl4 mno5`
7. **COPY THIS PASSWORD** (you won't see it again)

### **STEP 4: Test REST API (5 minutes)**

1. Open your browser
2. Visit: `https://your-wordpress-url.com/wp-json/wp/v2/posts`
3. Should see JSON data (list of posts)
4. If error: Go to Step 2 and verify HTTPS & REST API enabled

### **STEP 5: Test with cURL (Advanced)**

Open terminal and run:

```bash
curl -u admin:abc1def2ghi3jkl4mno5 \
  https://your-wordpress-url.com/wp-json/wp/v2/posts
```

Replace:
- `admin` = your WordPress username
- `abc1def2ghi3jkl4mno5` = your application password (no spaces)

Should return JSON.

---

## 🔧 For Bluehost Customers

If you're on Bluehost:

### **Bluehost-Specific Setup:**

1. **Enable HTTPS:**
   - Bluehost Dashboard → **SSL Certificate**
   - Click **Activate** (free)
   - Wait 5 minutes for activation

2. **Update WordPress:**
   - Bluehost Dashboard → **Marketplace** → **WordPress Updates**
   - Ensure you're on **WordPress 5.6+**

3. **Enable Application Passwords:**
   - WordPress Admin → **Plugins** → **Add New**
   - Search: "Application Passwords"
   - Install & Activate

4. **Test REST API:**
   - Visit: `https://your-site.com/wp-json`
   - Should see API endpoints

---

## 📋 Checklist

- [ ] WordPress version is 5.6 or higher
- [ ] HTTPS is enabled (URLs start with `https://`)
- [ ] REST API is enabled (Permalinks not set to "Plain")
- [ ] Application Passwords plugin installed
- [ ] Application Password created for your user
- [ ] REST API responds with JSON
- [ ] Can authenticate with username + app password

---

## ❓ Still Getting Error?

### **Error: "This does not appear to be a valid WordPress installation"**
- Your WordPress URL is incorrect
- Try: `https://your-site.com/wp-json`
- Should return JSON, not HTML error

### **Error: "REST API is disabled"**
- Go to **Settings** → **Permalinks**
- Change from "Plain" to anything else
- Save

### **Error: "Application Passwords not available"**
- Your hosting doesn't support it yet
- Contact support or try alternative: **JWT Authentication** plugin

### **Error: "SSL Certificate error"**
- Click link in error message to enable free SSL
- Wait 5-15 minutes for activation
- Try again

---

## 🚀 Next Steps (After Fixing)

Once you can authenticate:

1. Update `wordpress-api-config.js` with your real WordPress URL
2. Set environment variables in Netlify
3. Create sample content (movies, news, box office)
4. Test the API fetch in your app

---

## 📞 Need Help?

**Contact your hosting provider with this info:**
- Site URL: `https://your-site.com`
- Error: "Site does not support application password authentication"
- Request: Enable application passwords & HTTPS

**Or use the simpler approach below:**

---

## Simple Alternative: Use Basic Authentication

If Application Passwords still don't work, use Basic Authentication:

### **In your app code:**

```javascript
const username = 'your_username';
const password = 'your_password';
const auth = btoa(`${username}:${password}`);

fetch('https://your-wordpress-url.com/wp-json/wp/v2/posts', {
  headers: {
    'Authorization': `Basic ${auth}`,
    'Content-Type': 'application/json'
  }
});
```

⚠️ **Note:** Only use Basic Auth over HTTPS (which you have)
