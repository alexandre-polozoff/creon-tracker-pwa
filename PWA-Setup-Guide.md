# Creon Tracker PWA Setup Guide

## What's New - Version 1.2.0

Your Creon Tracker is now a **Progressive Web App (PWA)**! This means users can install it like a native app on any device.

## Files Included

1. **creon-tracker.html** - Updated with PWA functionality (Version 1.2.0)
2. **manifest.json** - App configuration file
3. **service-worker.js** - Enables offline functionality and caching
4. **PWA-Setup-Guide.md** - This file

## What PWA Adds

### ✨ New Features:
- **Install Prompt**: Users see a banner asking to install the app
- **Offline Support**: App works without internet after first load
- **App-Like Experience**: Runs in full-screen mode without browser UI
- **Home Screen Icon**: Shows up like a native app
- **Faster Loading**: Files cached for instant access
- **Auto-Updates**: Users notified when new version available
- **App Shortcuts**: Quick access to Log Creon or Log Stool (Android)

### 📱 User Benefits:
- No app store needed
- Works on Android, iOS, Windows, Mac, Linux
- Automatic updates
- Better performance
- Professional app experience

## Installation Instructions

### Step 1: Create App Icons

You need to create icon files in various sizes. You can:

**Option A: Use an Icon Generator (Easiest)**
1. Go to https://www.pwabuilder.com/imageGenerator
2. Upload a 512x512 image (simple design recommended)
3. Download the generated icons
4. Extract and place all PNG files in the same folder as creon-tracker.html

**Option B: Create Manually**
Create a simple icon with these specs:
- Background: Purple gradient (#667eea to #764ba2)
- Text: White "💊" emoji or "CREON" text
- Save as PNG in these sizes:
  - icon-72.png (72x72)
  - icon-96.png (96x96)
  - icon-128.png (128x128)
  - icon-144.png (144x144)
  - icon-152.png (152x152)
  - icon-192.png (192x192)
  - icon-384.png (384x384)
  - icon-512.png (512x512)

**Option C: Use Placeholder Icons (Quick Test)**
You can start with a simple placeholder:
1. Create a 512x512 purple square with "💊" emoji
2. Use an online tool to resize to all required sizes
3. Replace with professional icons later

### Step 2: Upload Files to Server

For the PWA to work, files must be served from a web server (not just opened locally). Options:

**Option A: GitHub Pages (Free & Easy)**
1. Upload all files to your GitHub repository:
   - creon-tracker.html
   - manifest.json
   - service-worker.js
   - All icon PNG files
2. Enable GitHub Pages in repository settings
3. Your app will be at: https://yourusername.github.io/creon-tracker/creon-tracker.html

**Option B: Netlify (Free)**
1. Sign up at netlify.com
2. Drag and drop your folder with all files
3. Get instant deployment
4. Custom domain available

**Option C: Your Own Web Hosting**
Upload all files to your web hosting via FTP

### Step 3: Test the PWA

1. **Open in Chrome/Edge (Desktop)**
   - Visit your hosted URL
   - Look for install icon in address bar (⊕ or download icon)
   - Click to install

2. **Test on Android**
   - Visit URL in Chrome
   - Tap menu (⋮) → "Install app" or "Add to Home screen"
   - OR wait for the install banner to appear at the bottom

3. **Test on iOS**
   - Visit URL in Safari
   - Tap Share → "Add to Home Screen"
   - (iOS doesn't support service workers fully, but still installable)

### Step 4: Verify Installation

✅ **Check that it works:**
- App appears on home screen/app menu
- Opens in standalone mode (no browser UI)
- Works offline (turn off wifi, try to open)
- Shows your custom icon
- Displays install banner on first visit

## File Structure

Your deployment should look like this:

```
your-website/
├── creon-tracker.html
├── manifest.json
├── service-worker.js
├── icon-72.png
├── icon-96.png
├── icon-128.png
├── icon-144.png
├── icon-152.png
├── icon-192.png
├── icon-384.png
└── icon-512.png
```

## PWA Features Explained

### 1. Service Worker (service-worker.js)
- Caches app files for offline use
- Handles updates automatically
- Improves performance
- Required for PWA functionality

### 2. Manifest (manifest.json)
- Defines app name, colors, icons
- Controls how app appears when installed
- Adds home screen shortcuts
- Sets display mode (standalone)

### 3. Install Prompt
- Automatically shows install banner on first visit
- Users can click "Install" or "Not Now"
- Once dismissed, doesn't show again (respects user choice)
- Can be manually triggered from browser menu

## Testing Checklist

Before releasing:

- [ ] All icon files present and correct sizes
- [ ] Files uploaded to web server (not local file://)
- [ ] HTTPS enabled (required for service workers)
- [ ] manifest.json accessible at your-url/manifest.json
- [ ] service-worker.js accessible at your-url/service-worker.js
- [ ] Install banner appears on first visit
- [ ] App installs successfully on Android
- [ ] App installs successfully on desktop Chrome
- [ ] App works offline after installation
- [ ] App icon displays correctly
- [ ] Version number shows 1.2.0

## Browser Compatibility

### Fully Supported:
- ✅ Chrome (Android, Desktop, ChromeOS)
- ✅ Edge (Desktop, Android)
- ✅ Samsung Internet (Android)
- ✅ Opera (Android, Desktop)

### Partially Supported:
- ⚠️ Safari (iOS/Mac) - Installable but limited service worker support
- ⚠️ Firefox (Desktop, Android) - Works but install prompt may differ

### Not Supported:
- ❌ Internet Explorer (outdated browser)

## Troubleshooting

### Install Prompt Doesn't Appear
- Check browser console for errors (F12)
- Ensure HTTPS is enabled
- Verify manifest.json is loading (check Network tab)
- Service worker must register successfully
- May need to clear cache and reload

### Service Worker Not Registering
- Must be served over HTTPS (not http:// or file://)
- Check browser console for error messages
- Verify service-worker.js path is correct
- Try clearing browser cache

### Icons Not Showing
- Verify icon files exist at the paths in manifest.json
- Check file names match exactly (case-sensitive)
- Icons must be PNG format
- Minimum size: 192x192 for most features

### App Not Working Offline
- Service worker must install successfully first
- Visit app at least once with internet
- Check Application tab in browser DevTools
- Verify files are cached in Cache Storage

### Updates Not Appearing
- Service worker caches aggressively
- Clear site data in browser settings
- Or increment version in service-worker.js CACHE_NAME
- Users will see update prompt automatically

## Advanced Features (Optional)

### Push Notifications
The service worker includes code for push notifications. To enable:
1. Request notification permission
2. Set up push notification server
3. Subscribe users to push service
4. Send notifications from server

### Background Sync
Code included for periodic background sync (monthly export reminder). Requires:
1. User permission
2. Browser support (limited)
3. Registration in service worker

### App Shortcuts
Already configured in manifest.json:
- "Log Creon Dose" - Quick shortcut
- "Log Stool" - Quick shortcut

These appear when long-pressing app icon (Android).

## Updating the PWA

When you release a new version:

1. **Update version number:**
   - In creon-tracker.html (display version)
   - In service-worker.js (CACHE_NAME)
   - In manifest.json (optional version field)

2. **Upload new files** to server

3. **Users automatically notified:**
   - Service worker detects update
   - Shows "New version available" prompt
   - Users click OK to reload and update

## GitHub Pages Deployment

### Quick Setup:

1. **Commit all files:**
```bash
git add creon-tracker.html manifest.json service-worker.js icon-*.png
git commit -m "Add PWA functionality - Version 1.2.0"
git push
```

2. **Enable GitHub Pages:**
   - Go to repository Settings
   - Click "Pages" in sidebar
   - Select "main" branch
   - Click Save

3. **Access your app:**
   - URL: https://yourusername.github.io/repository-name/creon-tracker.html
   - Share this URL with users

### Custom Domain (Optional):
1. Add CNAME file with your domain
2. Configure DNS settings
3. Enable HTTPS in GitHub Pages settings

## Marketing Your PWA

Now that you have a PWA, you can:

✅ Share direct link - users can install instantly
✅ No app store approval needed
✅ Works on all platforms
✅ Faster updates - push anytime
✅ Better SEO - web-discoverable
✅ Lower barriers - no download required

### Sharing Instructions:

**For users:**
"Visit [your-url] on your phone or computer. You'll see an 'Install' button - tap it to add Creon Tracker to your home screen!"

**For healthcare providers:**
"Share [your-url] with your patients. They can install it directly from their browser - no app store needed."

## Security Notes

- PWAs require HTTPS (secure connection)
- GitHub Pages provides HTTPS automatically
- Service workers only work over HTTPS
- Local development uses http://localhost (exempt)

## Performance Benefits

- **First load:** Downloads and caches all files
- **Subsequent loads:** Instant (served from cache)
- **Offline:** Full functionality without internet
- **Updates:** Background download, no user disruption

## Analytics (Optional)

To track PWA installations:

```javascript
// Add to creon-tracker.html
window.addEventListener('appinstalled', () => {
  // Track installation
  console.log('PWA installed');
  // Send to analytics if you use it
});
```

## FAQ

**Q: Do I need to submit to app stores?**
A: No! That's the beauty of PWA - users install directly from browser.

**Q: Will it work on iPhone?**
A: Yes, but with limitations. Full offline support requires Safari 15+.

**Q: How do users update?**
A: Automatically. Service worker checks for updates and prompts user.

**Q: Can I add to Google Play Store?**
A: Yes! You can wrap PWA using Trusted Web Activity (advanced).

**Q: Does this replace the web app?**
A: No, it enhances it. Same files work as web app AND installable app.

**Q: How much does hosting cost?**
A: Free on GitHub Pages, Netlify, or similar services.

## Support

If you encounter issues:
1. Check browser console (F12) for errors
2. Verify all files are uploaded
3. Ensure HTTPS is enabled
4. Test in Chrome first (best PWA support)
5. Check this guide's troubleshooting section

## Next Steps

1. ✅ Create/generate app icons
2. ✅ Upload all files to web server
3. ✅ Test installation on Android
4. ✅ Test installation on desktop
5. ✅ Verify offline functionality
6. ✅ Share link with users!

---

**Version:** 1.2.0
**PWA Status:** Fully Enabled
**Offline Support:** Yes
**Install Prompt:** Yes
**Auto-Updates:** Yes

Enjoy your new Progressive Web App! 🎉
