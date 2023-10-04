const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
const { spawnSync } = require('child_process');


ipcMain.handle('python_sign_in', async (event, args) => {
  // Call the Python script when requested from the renderer process
  const pythonProcess = spawnSync('python', ['./store.py', args[0], args[1]]);

  if (pythonProcess.error) {
    console.error('Error executing Python script:', pythonProcess.error);
    return;
  }

  const stdout = pythonProcess.stdout.toString().trim();
  console.log('Python script result:', stdout);

  return stdout;
}
);

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
      preload: path.join(__dirname, "preload.js") // use a preload script
    }
  });
  // Load your HTML or URL here
  win.loadFile('index.html');
}
app.on("ready", createWindow);

const callPythonFunction = (args) => {
  const pythonProcess = spawnSync('python', ['./store.py', args[0], args[1]]);

  if (pythonProcess.error) {
    console.error('Error executing Python script:', pythonProcess.error);
    return;
  }

  const stdout = pythonProcess.stdout.toString().trim();
  console.log('Python script result:', stdout);
};

