'use strict'

declare const __static: string;
import path from 'path';
import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'
const { autoUpdater } = require("electron-updater")

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

let mainWindow: any;
let chartWindow: any;

async function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    minWidth: 920,
    minHeight: 800,
    title: "Albuquerque ARTCC - Information Display System",
    webPreferences: {
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      nodeIntegrationInSubFrames: false,
      contextIsolation: true,
      webSecurity: false,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__static, 'icon.png')
  });

  mainWindow.setMenuBarVisibility(false)
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) mainWindow.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    mainWindow.loadURL('app://./index.html')
  }
}

app.commandLine.appendSwitch('proxy-serv')

app.whenReady().then(async () => {
	protocol.registerFileProtocol('ids', (request, callback) => {
		const url = request.url.substr(7)
		callback({path: path.normalize(`${__dirname}/${url}`)})
	})
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {

  if(!isDevelopment) {
    autoUpdater.checkForUpdates();

    autoUpdater.on('update-downloaded', (info: any) => {
      mainWindow.webContents.send('update', info.version);
    })
  }

  try {
    await installExtension('ieepebpjnkhaiioojkepfniodjmjjihl') // Install custom PDF viewer extension to prevent Chrome's big side-menu from taking up all the space. Based on pdf.js.
  } catch(e) {
    console.error('Failed to install PDF viewer:', e.toString())
  }

	 if (isDevelopment && !process.env.IS_TEST) {
		// // Install Vue Devtools
    // Electron crashes when the Vue DevTools are installed.  Unsure why.
		// try {
		// 	await installExtension(VUEJS3_DEVTOOLS)
		// } catch (e) {
		// 	console.error('Vue Devtools failed to install:', e.toString())
		// }
  }
	createWindow();
})

ipcMain.on("loadPdfWindow", (event, args) => {
  const pos = mainWindow.getPosition();

  chartWindow = new BrowserWindow({
    width: 800,
    height: 900,
    title: `${args.airport} – ${args.name}`,
    webPreferences: {
      plugins: true
    },
    icon: path.join(__static, 'icon.png'),
    parent: mainWindow
  })

  chartWindow.setPosition(pos[0], pos[1]); // set X and Y coordinates of chartWindow to that of the mainWindow to prevent it opening up on wrong screen
  chartWindow.center(); // center on right screen
  chartWindow.setMenuBarVisibility(false)
  chartWindow.loadURL(`${args.url}#toolbar=0&view=FitH`);
})

ipcMain.on("restartToUpdate", (event, args) => {
  autoUpdater.quitAndInstall();
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}