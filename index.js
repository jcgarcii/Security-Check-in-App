/**
 * File: index.js
 * Author: Jose Carlos Garcia
 * Description: Main Electron process that creates the browser window and handles communication with the Python script.
 * Version: 2.0
 * Last Modified: 9/21/2023
 */

const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
const { spawn } = require('child_process');

// Function to handle asynchronous messages: signing users in and out of the building
ipcMain.handle('python_sign_in', async (event, args) => {
  try {
    const app_path = app.getAppPath();
    // Call the Python script when requested from the renderer process
    const pythonProcess = spawn('python', ['./python/check_user.py', args[0], args[1], app_path]);

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

// Function to create the browser window
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

