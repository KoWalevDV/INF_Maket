const fs   = require('fs');
const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');

let windows = {};

function loadUsers() {
  const file = path.join(__dirname, '..', 'users.json');
  console.log('Reading users.json from', file);
  try {
    return JSON.parse(fs.readFileSync(file, 'utf-8'));
  } catch (e) {
    console.error('Не удалось прочитать users.json', e);
    return [];
  }
}

const users = loadUsers();
console.log('Users:', users);

function createLoginWindow() {
  const win = new BrowserWindow({
    width: 600, height: 450, resizable: false,
    webPreferences: { preload: path.join(__dirname, 'preload.js') }
  });
  windows.login = win;
  // Открываем DevTools для дебага:
  win.webContents.openDevTools({ mode: 'detach' });
   win.loadURL('http://localhost:5173/login.html')
   .catch(err => console.error('Failed to load login page:', err));
}

function createRoleWindow(role) {
  const win = new BrowserWindow({
    width: 1280, height: 800,
    webPreferences: { preload: path.join(__dirname, 'preload.js') }
  });
  // Для удобства тоже открываем DevTools:
  win.webContents.openDevTools({ mode: 'detach' });
  win.loadURL(`http://localhost:5173/?role=${role}`)
  .catch(err => console.error('Failed to load main app:', err));
  windows[role] = win;
}

app.whenReady().then(createLoginWindow);

ipcMain.on('login-submit', (event, { username, password }) => {
  console.log('Login attempt:', username, password);
  const u = users.find(u => u.username === username && u.password === password);
  if (!u) {
    event.reply('login-failed', 'Неверное имя пользователя или пароль');
    return;
  }
  windows.login.close();
  createRoleWindow(u.role);
});

// Обработка выхода
ipcMain.on('logout', event => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (win) win.close();
    createLoginWindow();
  });
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
