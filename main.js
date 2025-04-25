const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
    const win = new BrowserWindow({
        width: 1000,
        height: 700,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        }
    });

    win.loadFile('index.html');
}

const NOTES_PATH = path.join(__dirname, 'notes.json');

// Handle save from renderer
ipcMain.on('save-note', (event, content) => {
    fs.writeFileSync(NOTES_PATH, JSON.stringify({ note: content }, null, 2));
});

// Handle load to renderer
ipcMain.handle('load-note', () => {
    if (fs.existsSync(NOTES_PATH)) {
        const data = fs.readFileSync(NOTES_PATH);
        return JSON.parse(data).note || '';
    }
    return '';
});

app.whenReady().then(createWindow);
