/**
 * File: preload.js
 * Author: Jose Carlos Garcia
 * Description: Main Electron preloader that exposes protected methods to the renderer process.
 * Version: 2.0
 * Last Modified: 10/1/2023
 */

const {
    contextBridge,
    ipcRenderer
} = require("electron");

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const type of ['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, process.versions[type])
    }
})
// Expose protected methods that allow the renderer process to use
contextBridge.exposeInMainWorld(
    "api", {
        invoke: (channel, data) => {
            let validChannels = ['python_sign_in']; // <-- Array of all ipcRenderer valid channels
            if (validChannels.includes(channel)) {
                return ipcRenderer.invoke(channel, data); // data is the argument to the invoke call
            }
        },
    }
);
