const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('electronAPI', {
  loginSubmit: creds => ipcRenderer.send('login-submit', creds),
  onLoginFailed: cb => ipcRenderer.on('login-failed', (_, msg) => cb(msg)),
  logout:       ()  => ipcRenderer.send('logout'),
});
