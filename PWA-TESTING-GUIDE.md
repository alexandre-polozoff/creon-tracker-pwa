# PWA Testing Guide for Creon Tracker

## Complete Testing Checklist

This guide will help you thoroughly test all PWA features before releasing your app.

---

## Pre-Deployment Testing (Local)

### 1. Local HTTPS Server Setup

PWA features require HTTPS. For local testing:

**Option A: Python HTTP Server**
```bash
# Python 3
python3 -m http.server 8000

# Then open: http://localhost:8000/creon-tracker.html
```

**Option B: VS Code Live Server**
1. Install "Live Server" extension
2. Right-click `creon-tracker.html`
3. Select "Open with Live Server"

**Option C: Node.js http-server**
```bash
npm install -g http-server
http-server -p 8000
```

**Note:** Service Workers work on `localhost` even without HTTPS.

---

## Testing on Different Platforms

### 🖥️ Desktop Chrome/Edge (Best PWA Support)

#### Installation Test
1. Open your app URL
2. Look for install icon in address bar (⊕ or computer icon)
3. Click to install
4. **Expected:** App opens in standalone window

**Alternative Install Method:**
- Click three dots menu → "Install Creon Tracker..."

#### What to Verify:
- ✅ App appears in Start Menu/Applications
- ✅ Opens in borderless window (no browser UI)
- ✅ Has proper icon in taskbar
- ✅ Can be pinned to taskbar/dock

#### Uninstall Test:
- Three dots in app window → "Uninstall Creon Tracker"
- **Expected:** Clean uninstallation

---

### 📱 Android Chrome (Excellent PWA Support)

#### Installation Test
1. Open app URL in Chrome
2. Wait for bottom banner: "Install Creon Tracker"
3. Tap "Install"
4. **Expected:** Icon added to home screen

**Alternative Install Method:**
- Menu (⋮) → "Install app" or "Add to Home screen"

#### What to Verify:
- ✅ Icon appears on home screen
- ✅ Opens fullscreen (no browser UI)
- ✅ Shows splash screen on launch
- ✅ Status bar matches theme color (#667eea)
- ✅ App appears in app drawer
- ✅ Long-press icon shows app shortcuts (Log Creon, Log Stool)

#### Android-Specific Features:
**App Shortcuts Test:**
1. Long-press app icon
2. Should see:
   - "Log Creon Dose"
   - "Log Stool"
3. Tap shortcut → opens to that tab

**Background Behavior:**
1. Open app
2. Press Home button
3. Reopen app
4. **Expected:** Returns to same state

---

### 🍎 iOS Safari (Limited PWA Support)

#### Installation Test
1. Open app URL in Safari
2. Tap Share button (⬆️)
3. Scroll and tap "Add to Home Screen"
4. Tap "Add"

#### What to Verify:
- ✅ Icon added to home screen
- ✅ Opens fullscreen
- ✅ Shows correct icon
- ⚠️ No install banner (iOS limitation)
- ⚠️ Limited service worker support

#### iOS Limitations:
- No automatic install prompt
- Service worker may be unreliable
- No background sync
- No push notifications
- localStorage may clear after ~7 days of inactivity

**Recommendation for iOS users:**
Emphasize the Export feature for data backup.

---

## Service Worker Testing

### 1. Registration Test

**Open Browser DevTools (F12):**

**Chrome/Edge:**
1. Application tab → Service Workers
2. Should see: "service-worker.js" - Status: activated

**Firefox:**
1. about:debugging#/runtime/this-firefox
2. Look for your app's service worker

**What to Check:**
- ✅ Service worker registered
- ✅ Status: "activated and running"
- ✅ Scope: Your app URL
- ✅ No error messages in console

### 2. Caching Test

**Check Cached Files:**
1. DevTools → Application → Cache Storage
2. Expand "creon-tracker-v1.1.0"
3. Should contain:
   - creon-tracker.html
   - manifest.json

**Verify Caching:**
1. Open app with DevTools Network tab open
2. Reload page
3. Files should show "(ServiceWorker)" as source
4. Or show 200 status with "disk cache"

### 3. Offline Functionality Test

**Critical Test - Must Pass:**

**Method 1: DevTools Simulation**
1. Open app in Chrome
2. F12 → DevTools → Network tab
3. Check "Offline" checkbox
4. Reload page
5. **Expected:** App loads normally

**Method 2: Actual Offline**
1. Open app on phone
2. Enable Airplane mode
3. Close and reopen app
4. **Expected:** App works completely

**Method 3: Service Worker Bypass**
1. DevTools → Application → Service Workers
2. Click "Bypass for network"
3. Try loading app
4. **Expected:** Shows error (proves service worker is working)
5. Uncheck "Bypass"

**Test All Features Offline:**
- ✅ Log Creon dose
- ✅ Log stool
- ✅ View history
- ✅ Export data
- ✅ Navigate between tabs
- ✅ Delete entries

### 4. Update Test

**Simulate App Update:**

1. **Make a change:**
   - Edit `service-worker.js`
   - Change `CACHE_NAME` to `'creon-tracker-v1.2.0'`
   - Save and deploy

2. **Test update flow:**
   - Open app (with old version)
   - Wait 10-30 seconds
   - Should see prompt: "A new version... Reload to update?"
   - Click OK
   - **Expected:** App reloads with new version

3. **Verify update:**
   - Check DevTools → Application → Service Workers
   - Should show new version activated
   - Old cache should be deleted

---

## Feature-by-Feature Testing

### 📝 Creon Logging

**Test Case 1: Basic Entry**
1. Go to "Log Creon" tab
2. Enter: 2 doses at 12:00 PM, meal "Lunch"
3. Click "Log Creon Dose"
4. **Expected:** Success message, form clears

**Test Case 2: Entry Validation**
1. Try logging without doses
2. **Expected:** Can't proceed (required field)
3. Try logging 0 doses
4. **Expected:** Should work (user might track this)

**Test Case 3: Time Auto-Fill**
1. Switch to "Log Creon" tab
2. **Expected:** Time field pre-filled with current time

**Test Case 4: Symptoms Field**
1. Log entry with symptoms: "Bloating, gas"
2. Check history
3. **Expected:** Symptoms visible in entry

### 💩 Stool Logging

**Test Case 1: Bristol Stool Chart**
1. Go to "Log Stool" tab
2. Click each type (1-7)
3. **Expected:** Selected type highlights (purple background)

**Test Case 2: Additional Properties**
1. Select Type 4
2. Check: "Floating"
3. Click "Log Stool"
4. **Expected:** Entry saved with all details

**Test Case 3: Notes Field**
1. Add notes: "After breakfast"
2. **Expected:** Notes saved and visible in history

### 📊 History Tab

**Test Case 1: Display Order**
1. Log several entries across different days
2. Go to History tab
3. **Expected:** Newest entries first

**Test Case 2: Entry Details**
Each entry should show:
- ✅ Date and time
- ✅ Entry type (Creon/Stool badge)
- ✅ All relevant details
- ✅ Delete button

**Test Case 3: Delete Function**
1. Click delete on an entry
2. Confirm deletion
3. **Expected:** Entry removed from list
4. Reload app
5. **Expected:** Entry still gone (permanently deleted)

**Test Case 4: Empty State**
1. Delete all entries
2. **Expected:** "No entries yet..." message

### 📤 Export Feature

**Test Case 1: Basic Export**
1. Have several entries logged
2. Go to Settings → Export Data
3. Click "Export All Data (CSV)"
4. **Expected:** CSV file downloads

**Test Case 2: File Name**
- Format: `creon-tracker-MMM-YYYY-export.csv`
- Example: `creon-tracker-Feb-2026-export.csv`

**Test Case 3: CSV Content**
1. Open exported CSV in Excel/Numbers
2. Verify columns:
   - Type, Date, Time, Doses, Meal, Symptoms, Stool Quality, Stool Notes
3. Verify data accuracy

**Test Case 4: Empty Export**
1. Delete all entries
2. Try to export
3. **Expected:** "No data to export yet!" message

**Test Case 5: Monthly Auto-Export**
- This feature triggers on last day of month
- Difficult to test without changing system date
- Should trigger: Feb 28, Mar 31, etc.

### ⚙️ Settings Tab

**Test Case 1: Information Display**
Verify all sections display:
- ✅ Version number (1.2.0)
- ✅ Privacy information
- ✅ Export instructions
- ✅ Data management options

**Test Case 2: Clear All Data**
1. Have some entries logged
2. Click "Clear All Data"
3. Confirm action
4. **Expected:** All data deleted
5. Check History tab
6. **Expected:** Empty

**Test Case 3: Reset Install Prompt**
1. Dismiss install banner
2. Go to Settings
3. Click "Reset Install Prompt"
4. Reload app
5. **Expected:** Install banner appears again

---

## Data Persistence Testing

### LocalStorage Test

**Test Case 1: Data Survives Reload**
1. Log several entries
2. Close browser completely
3. Reopen and navigate to app
4. **Expected:** All data still present

**Test Case 2: Data Survives Offline**
1. Log entries
2. Go offline
3. Close and reopen app
4. **Expected:** Data still present

**Test Case 3: Export and Import**
1. Log entries
2. Export to CSV
3. Clear all data
4. Verify you can use CSV to restore (manual process)

### Storage Limits

**Test Case: Large Data Set**
1. Log 100+ entries over several weeks
2. Check app performance
3. Export data
4. **Expected:** No slowdown, clean export

---

## Install Prompt Testing

### First Visit Test

**Test Case 1: Banner Appearance**
1. Open app in private/incognito mode
2. **Expected:** Install banner slides up from bottom after 2-3 seconds

**Test Case 2: Install Button**
1. Click "Install" on banner
2. **Expected:** Browser install dialog appears
3. Confirm installation
4. **Expected:** App installs, banner disappears

**Test Case 3: Dismiss Button**
1. Clear browser data, revisit app
2. Click "Not Now" on banner
3. Reload page
4. **Expected:** Banner doesn't reappear

**Test Case 4: No Repeat**
Once dismissed, banner shouldn't show again until user:
- Clears browser data, OR
- Clicks "Reset Install Prompt" in Settings

---

## Performance Testing

### Load Time Test

**Using Chrome DevTools:**
1. Open DevTools → Lighthouse
2. Select "Progressive Web App" category
3. Click "Generate report"
4. **Target Scores:**
   - PWA: 100/100
   - Performance: 90+/100
   - Accessibility: 90+/100

### Network Conditions Test

**Simulate Slow Connection:**
1. DevTools → Network tab
2. Throttling: "Slow 3G"
3. Reload app
4. **Expected:** 
   - Initial load takes longer
   - Subsequent loads instant (cached)

---

## Security Testing

### HTTPS Verification

**For GitHub Pages:**
- URL must start with `https://`
- Click padlock icon in address bar
- **Expected:** "Connection is secure"

**For Custom Domain:**
- Ensure HTTPS is enabled
- Certificate must be valid

### Content Security

**Check for:**
- ✅ No mixed content warnings
- ✅ No console errors about blocked resources
- ✅ Service worker only loads on HTTPS

---

## Browser Compatibility Testing

### Recommended Testing Matrix:

| Platform | Browser | Install | Offline | Priority |
|----------|---------|---------|---------|----------|
| Desktop | Chrome | ✅ | ✅ | High |
| Desktop | Edge | ✅ | ✅ | High |
| Desktop | Firefox | ⚠️ | ✅ | Medium |
| Desktop | Safari | ❌ | ⚠️ | Low |
| Android | Chrome | ✅ | ✅ | Critical |
| Android | Firefox | ⚠️ | ✅ | Low |
| Android | Samsung Internet | ✅ | ✅ | Medium |
| iOS | Safari | ⚠️ | ⚠️ | High |
| iOS | Chrome | ⚠️ | ⚠️ | Low |

**Legend:**
- ✅ Full support
- ⚠️ Partial support
- ❌ Not supported

---

## Automated Testing Checklist

### Lighthouse PWA Audit

**Run Lighthouse:**
1. Open app in Chrome
2. F12 → Lighthouse tab
3. Select "Progressive Web App"
4. Click "Analyze page load"

**Must Pass:**
- ✅ Installable
- ✅ PWA optimized
- ✅ Works offline
- ✅ Has a viewport meta tag
- ✅ Contains icons for install
- ✅ Has a themed address bar

**Common Issues:**
- ❌ "Does not register a service worker" → Check service worker file
- ❌ "Manifest doesn't have maskable icon" → Non-critical, can ignore
- ❌ "Page load is not fast enough" → Optimize images, minify code

---

## Pre-Release Testing Checklist

Before sharing publicly, complete this final checklist:

### Critical Tests ⚠️
- [ ] App installs successfully on Android Chrome
- [ ] App works completely offline
- [ ] Data persists after closing app
- [ ] Export creates valid CSV file
- [ ] Delete function works correctly
- [ ] No console errors in any browser
- [ ] Service worker registers successfully
- [ ] All icons load correctly

### Platform Tests
- [ ] Tested on at least one Android device
- [ ] Tested on at least one iOS device (if targeting iOS)
- [ ] Tested on Chrome desktop
- [ ] Tested on Edge or Firefox desktop

### Feature Tests
- [ ] Log Creon with all fields
- [ ] Log Stool with all types
- [ ] View complete history
- [ ] Export data works
- [ ] Clear data works
- [ ] Install prompt appears and works
- [ ] App update process works

### Edge Cases
- [ ] Empty state displays correctly
- [ ] Large datasets (50+ entries) perform well
- [ ] Rapid entry logging works
- [ ] Navigation between tabs is smooth
- [ ] Time input accepts various formats

### Security & Privacy
- [ ] HTTPS enabled
- [ ] No data sent to server (verify in Network tab)
- [ ] localStorage only (no cookies)
- [ ] Export gives users full data access
- [ ] Privacy statement present

---

## Common Issues & Solutions

### Issue: Service Worker Not Registering

**Symptoms:**
- "Service Worker registration failed" in console
- App doesn't work offline
- No caching

**Solutions:**
1. Verify file is named exactly `service-worker.js`
2. Check file is in same directory as HTML
3. Ensure serving over HTTPS or localhost
4. Clear browser cache and try again
5. Check for JavaScript errors in service worker file

### Issue: Install Prompt Not Appearing

**Symptoms:**
- No banner at bottom of page
- Can't install app

**Solutions:**
1. Try private/incognito mode
2. Check if already dismissed (localStorage)
3. Verify manifest.json loads (Network tab)
4. Ensure all icon files exist
5. Try different browser
6. Check browser console for PWA errors

### Issue: App Not Working Offline

**Symptoms:**
- Blank page when offline
- "No internet connection" error

**Solutions:**
1. Verify service worker registered (DevTools)
2. Check files are cached (Application → Cache Storage)
3. Must visit app online first to cache
4. Check service worker isn't bypassed
5. Clear cache and retry online first

### Issue: Icons Not Showing

**Symptoms:**
- Broken image icons
- Default browser icon shows

**Solutions:**
1. Verify icon files uploaded to server
2. Check file names match manifest.json exactly
3. Icons must be PNG format
4. Test icon URLs directly in browser
5. Clear browser cache

### Issue: Data Not Persisting

**Symptoms:**
- Entries disappear after reload
- Empty history after closing app

**Solutions:**
1. Check browser allows localStorage
2. Not in private/incognito mode?
3. Check browser console for storage errors
4. iOS Safari may clear after 7 days inactivity
5. Verify no JavaScript errors on save

---

## Advanced Testing

### Performance Profiling

**Memory Usage:**
1. DevTools → Performance → Memory
2. Take heap snapshot after logging 100 entries
3. Check for memory leaks
4. **Expected:** Stable memory usage

**JavaScript Performance:**
1. DevTools → Performance
2. Record while using app
3. Check for slow functions
4. **Expected:** Smooth 60fps

### Accessibility Testing

**Keyboard Navigation:**
- Tab through all interactive elements
- Enter/Space activate buttons
- Esc closes modals

**Screen Reader:**
- Test with NVDA (Windows) or VoiceOver (Mac/iOS)
- All buttons have labels
- Form fields properly labeled

### Stress Testing

**Rapid Input:**
1. Log 20 entries quickly
2. Switch tabs rapidly
3. **Expected:** No lag or errors

**Large Dataset:**
1. Import 500+ entries via localStorage
2. Test history loading
3. Test export
4. **Expected:** Reasonable performance

---

## Success Criteria

Your PWA is ready for release when:

✅ **Core Functionality:**
- All features work as expected
- Data persists correctly
- Export produces valid CSV

✅ **PWA Features:**
- Installs on Android
- Works completely offline
- Shows install prompt
- Has all icons

✅ **Performance:**
- Lighthouse PWA score: 100
- No console errors
- Fast load time (<3 seconds)

✅ **Compatibility:**
- Works on Chrome Android
- Works on Chrome Desktop
- Works on iOS Safari (at least basic functionality)

✅ **User Experience:**
- Intuitive navigation
- Clear feedback
- No bugs or crashes

---

## Testing Documentation

Keep a log of your testing:

```markdown
## Test Log - [Date]

### Platform: Android Chrome
- Install: ✅ Works
- Offline: ✅ Works
- Features: ✅ All working
- Issues: None

### Platform: iOS Safari
- Install: ✅ Works
- Offline: ⚠️ Partially (service worker limitations)
- Features: ✅ All working
- Issues: Recommend frequent exports

### Notes:
- All critical tests passed
- Ready for beta release
```

---

## Beta Testing

Before public release:

1. **Select 5-10 beta testers**
2. **Provide testing instructions**
3. **Collect feedback** on:
   - Installation process
   - Feature usability
   - Any bugs or issues
   - Desired improvements
4. **Iterate** based on feedback
5. **Repeat** until no critical issues

---

## Monitoring After Release

Track these metrics:

- Installation rate (browsers support analytics for this)
- Crash/error reports (console logs)
- User feedback
- Feature usage (if analytics added)

---

## Final Pre-Launch Checklist

- [ ] All tests in this guide passed
- [ ] Beta testing completed
- [ ] Documentation updated
- [ ] Privacy policy added (if required)
- [ ] Contact information available
- [ ] Backup plan for issues
- [ ] Version number correct everywhere
- [ ] Icons professional and loading
- [ ] README.md has install instructions

**Congratulations! Your PWA is ready for release! 🎉**
