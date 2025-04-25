// preload.js
window.addEventListener('DOMContentLoaded', () => {
    // You can safely expose APIs later here
});

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('notesAPI', {
    saveNote: (content) => ipcRenderer.send('save-note', content),
    loadNote: () => ipcRenderer.invoke('load-note'),
});