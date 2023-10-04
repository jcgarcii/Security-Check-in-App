const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
const { spawnSync, spawn } = require('child_process');

ipcMain.handle('python_sign_in', async (event, args) => {
  try {
    // Call the Python script when requested from the renderer process
    const pythonProcess = spawn('python', ['./python/sign_in.py', args[0], args[1]]);

    pythonProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });

    return { result: 'Python script started.' };
  } catch (error) {
    console.error('Error executing Python script:', error);
    return { error: error.message };
  }
});
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: path.join(__dirname, "js/electron/preload.js") // use a preload script
    }
  });
  // Load your HTML or URL here
  win.loadFile('index.html');
}
app.on("ready", createWindow);

