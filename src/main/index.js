/* eslint-disable prettier/prettier */
import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
// import path from 'path'
const { exec } = require('child_process')
import { initializeApp } from 'firebase/app'
import {getStorage, ref, listAll, getDownloadURL} from'firebase/storage'

// var admin = require("firebase-admin");

// var serviceAccount = require("C:\temp\electron-setup-firebase-adminsdk-qsi49-f5bfb0bc70.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.on('teste', (event, data) => {
  console.warn(data)

  const firebaseConfig = {
    apiKey: 'AIzaSyDidEpxrAj8leuvC6S2gxvF7aKOXC8hBP4',
    authDomain: 'electron-setup.firebaseapp.com',
    projectId: 'electron-setup',
    storageBucket: 'gs://electron-setup.appspot.com',
    messagingSenderId: '827506858126',
    appId: '1:827506858126:web:a2c16fa8d7fd98b20011df',

  }

  // Initialize Firebase

  const app_firebase = initializeApp(firebaseConfig)

// eslint-disable-next-line prettier/prettier

    const storage = getStorage();
    const storageRef = ref(storage)

    const storagedownload = ref(storage, '3.6.rar')

//     listAll(storageRef)
//   .then((res) => {

// console.log(typeof(res));

// res.items.forEach(element => {
//   // console.log(typeof(element));
//   console.log(element._location.path);
// });

//   }).catch((error) => {
//     // Uh-oh, an error occurred!
//   });

  getDownloadURL(ref(storagedownload))
  .then((url) => {

    console.log(url);
  })
  .catch((error) => {
    // Handle any errors
  });



})

ipcMain.on('msg', (event, data) => {
  console.warn(data)

  // const a = path.resolve()
  // console.log(process.execPath)
  // console.log(path.join('C:', 'Program Files', 'nodejs', 'node.exe'))
  // shell01.echo("ipconfiggggg")
  //shell01.exec("C:\\Program Files\\PowerShell\\7\\pwsh.exe -ipconfig")
  // var sd = shell01.cd("C:\\Program Files\\PowerShell\\7\\")
  //  console.log(sd)
  //  shell01.exec("iisreset /stop")
  //  shell01.exec('node --version')
  //  shell01.exec("pwd")

  console.log('===Instalando dependências===')
  //

  // exec(`npm init -y && npm install --save-dev mocha --prefix ${path.resolve(process.cwd())}`, (error, stdout, stderr) => {
  exec(`iisreset /restart`, (error, stdout, stderr) => {
    if (error) {
      // console.log(`error: ${error.message}`);
      console.log(`error: ${error}`)
      return
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`)
    }
    if (stdout) {
      console.log(`stdout: ${stdout}`)
    }
    console.log('==Tudo pronto para começar==')
  })

  event.reply('respostaMain', [{ resposta: app.getVersion() }, { ip: 'b' }])
  // setTimeout(() => {
  //   event.reply('respostaMain', a)
  // }, 3500)
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
