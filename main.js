/* ============================================================
   Vik's Kanji (N5) — Electron Desktop App Entry Point
   
   HOW TO USE:
   1. Install Node.js from nodejs.org
   2. Put this file alongside index.html in a folder
   3. Run: npm init -y
   4. Run: npm install electron --save-dev
   5. In package.json, set "main": "main.js" and add:
         "scripts": { "start": "electron ." }
   6. Run: npm start
   
   TO BUILD A DISTRIBUTABLE (.dmg / .exe / .AppImage):
   1. Run: npm install electron-builder --save-dev
   2. Add to package.json:
         "build": {
           "appId": "com.vikwebs.n5kanji",
           "productName": "Vik's Kanji",
           "mac": { "category": "public.app-category.education" },
           "win": { "target": "nsis" },
           "linux": { "target": "AppImage" }
         }
   3. Run: npx electron-builder build --mac   (or --win / --linux)
   ============================================================ */

const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 820,
    height: 900,
    minWidth: 400,
    minHeight: 600,
    title: "Vik's Kanji (N5)",
    backgroundColor: '#1a1a1a',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
    // macOS specific
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
    trafficLightPosition: { x: 16, y: 16 },
  });

  // Load the game
  mainWindow.loadFile('index.html');

  // Open external links in system browser, not Electron
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.on('closed', () => { mainWindow = null; });
}

// ── App Menu ─────────────────────────────────────────────────
function buildMenu() {
  const template = [
    {
      label: "Vik's Kanji",
      submenu: [
        { label: 'About Vik\'s Kanji', role: 'about' },
        { type: 'separator' },
        { label: 'Hide', role: 'hide' },
        { role: 'hideOthers' },
        { type: 'separator' },
        { label: 'Quit', role: 'quit' },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' }, { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' }, { role: 'copy' }, { role: 'paste' },
        { role: 'selectAll' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        { type: 'separator' },
        { role: 'front' },
      ],
    },
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

// ── Lifecycle ────────────────────────────────────────────────
app.whenReady().then(() => {
  createWindow();
  buildMenu();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
