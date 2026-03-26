# Vik's Kanji (N5) — Publishing Guide

**Files in this package:**
| File | Purpose |
|------|---------|
| `index.html` | The complete game — rename to `index.html` when publishing |
| `manifest.json` | PWA manifest (makes it installable on mobile) |
| `sw.js` | Service worker (enables offline use) |
| `icon-192.png` | App icon (192×192) |
| `icon-512.png` | App icon (512×512) |
| `main.js` | Electron entry point (desktop app) |
| `package.json` | Electron build configuration |

> **Replace the placeholder icons** with a proper PNG before publishing.
> The placeholder is a simple red square. Design something nicer at canva.com or figma.com
> and export as a 512×512 PNG, then resize to 192×192 for the second icon.

---

## 1. Website (GitHub Pages) — Free, live in 5 min

1. Go to **github.com** → Sign up / Sign in
2. **New repository** → name it `n5-kanji` → Public → Create
3. Upload: `index.html` (rename from `n5_kanji_flashcard_game.html`), `manifest.json`, `sw.js`, `icon-192.png`, `icon-512.png`
4. **Settings → Pages → Source: main branch** → Save
5. Wait ~60 seconds → your site is live at:
   `https://YourUsername.github.io/n5-kanji`

**Custom domain** (e.g. vikwebs.n5-kanji.com):
1. Buy domain at namecheap.com or porkbun.com
2. In DNS: add `CNAME` record → Name: `n5-kanji` → Value: `yourusername.github.io`
3. In GitHub Pages settings → Custom domain → enter your domain
4. Check "Enforce HTTPS"

---

## 2. Mobile App — PWA (no app store, no coding)

The game is already a **Progressive Web App**. Users can install it
directly from the browser — it appears and behaves like a real app.

**iPhone / iPad:**
1. Open the game URL in **Safari** (must be Safari, not Chrome)
2. Tap the **Share** button (box with arrow pointing up)
3. Scroll down → tap **"Add to Home Screen"**
4. Tap **"Add"** → icon appears on home screen
5. Open it — runs full screen, no browser chrome

**Android:**
1. Open the game URL in **Chrome**
2. Chrome shows a banner: "Add to Home Screen" — tap it
3. Or: tap the 3-dot menu → "Install app"
4. Icon appears on home screen, runs standalone

**This is the recommended mobile approach** — no App Store fees, no approval
process, instant updates when you update the website.

---

## 3. iOS App Store / Android Play Store — Capacitor

Packages the web app into a real native app for submission to app stores.

**Requirements:** Node.js, Android Studio (Android), Xcode + Mac (iOS)

```bash
# Install Capacitor
npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android

# Initialize
npx cap init "Vik's Kanji" "com.vikwebs.n5kanji"

# Create www/ folder and put index.html + all files inside it
mkdir www
cp index.html www/
cp manifest.json sw.js icon-192.png icon-512.png www/

# Update capacitor.config.json: set "webDir": "www"

# Add platforms
npx cap add ios
npx cap add android

# Sync files
npx cap sync

# Open in IDE
npx cap open ios       # Opens Xcode — build and submit to App Store
npx cap open android   # Opens Android Studio — build and submit to Play Store
```

**App Store fees:** Apple = $99/year | Google = $25 one-time

---

## 4. macOS App — Electron

Packages the game as a native `.dmg` (macOS), `.exe` (Windows), or `.AppImage` (Linux).

**Requirements:** Node.js (nodejs.org)

```bash
# Put all files (index.html, main.js, manifest.json, sw.js, icons, package.json)
# in the same folder, then:

npm install        # installs electron and electron-builder

npm start          # runs the app in development mode

npm run build:mac  # creates a .dmg in the dist/ folder
npm run build:win  # creates a Windows installer
npm run build:linux # creates an AppImage
```

The built `.dmg` file can be distributed freely outside the App Store,
or submitted to the Mac App Store (requires $99/year Apple Developer account).

---

## 5. Updating the game

Whenever you change `index.html`:

- **Website:** re-upload `index.html` to GitHub — the site updates automatically
- **Mobile PWA:** users get the update the next time they open the app
- **Electron:** rebuild with `npm run build:mac` and redistribute the new `.dmg`
- **App Store:** resubmit through Xcode / Android Studio

---

*Made by Víctor Fernández Bravo Ahuja — vikwebs.com*
