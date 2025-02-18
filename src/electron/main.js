// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')
const sha256File = require('sha256-file');

// Enable live reload for Electron too
require('electron-reload')(path.join(__dirname, '../'), {
  // Note that the path to electron may vary according to the main file
  electron: require(`${__dirname}/node_modules/electron`)
});
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    backgroundColor: '#ECECEC',
    useContentSize: true,
    width: 565,
    height: 480,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.setMenu(null);
  if(process.argv.length >= 3) {
    global.filename= process.argv[process.argv.length - 1];
    sha256File(global.filename, function (error, sum) {
      if (error) return console.log(error);
      global.hashdata = sum;
      console.log("SHA256:", sum);
      mainWindow.loadFile('index.html')
    })
    console.log("Filename:", global.filename);
  }
  else {
    console.log("Args", process.argv);
    global.hashdata = "Please select a file to hash";
    mainWindow.loadFile('index.html')
  }
  
  // and load the index.html of the app.



  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
