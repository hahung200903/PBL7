// main.js
const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let pyProc = null;

function startPythonBackend() {
  const script = path.join(__dirname, 'python-backend', 'main.py');
  pyProc = spawn('python', [script], {
    cwd: path.join(__dirname, 'python-backend'),
    detached: false,
    stdio: 'inherit',
  });

  pyProc.on('error', (err) => {
    console.error('Failed to start Python backend:', err);
  });
}

function stopPythonBackend() {
  if (pyProc) {
    pyProc.kill();
    pyProc = null;
  }
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.loadFile(path.join(__dirname, 'client/dist/index.html'));
}

app.whenReady().then(() => {
  startPythonBackend();
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  stopPythonBackend();
  if (process.platform !== 'darwin') app.quit();
});

app.on('before-quit', () => {
  stopPythonBackend();
});
