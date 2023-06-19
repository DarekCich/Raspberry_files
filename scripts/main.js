// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain } = require('electron')
const wifi = require('node-wifi');
const fs = require("fs");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow(
    {
      width: 720,
      height: 480,
        webPreferences: {
          devTools: true,
            contextIsolation: false,
            nodeIntegration: true
     }
    })
    wifi.init({
        iface: null // Możesz podać nazwę interfejsu Wi-Fi, jeśli masz więcej niż jeden
    });
    const path = require('path');
  // and load the index.html of the app
    const userDataPath = app.getPath('userData');
    const loginDataPath = path.join(userDataPath, 'loginData.json');
    let loginData;
    wifi.getCurrentConnections((error, currentConnections) => {
        if (error) {
            console.log(error);
        } else {
            if (currentConnections.length >= 0) {
                try {
                    if (fs.existsSync(loginDataPath)) {

                        console.log(userDataPath)
                        mainWindow.loadFile('pages/index.html')

                    }
                    else {
                        mainWindow.loadFile('pages/loginPanel.html')
                    }
                } catch(err) {
                    console.error(err)
                }
            } else {
                mainWindow.loadFile('pages/internetPanel.html')
            }
        }
    });



  mainWindow.setFullScreen(true)


  // Open the DevTools.
  mainWindow.webContents.openDevTools()
    ipcMain.on('loginData', (event, data) => {
        const { username, password } = data;
        const loginData = {
            username: username,
            password: password
        };
        // Przetwarzanie otrzymanych danych
        fs.writeFileSync(loginDataPath, JSON.stringify(loginData));
        // mainWindow.loadFile('index.html')
    });
    ipcMain.on('loginDataRequest', (event) => {
        loginData = JSON.parse(fs.readFileSync(loginDataPath, 'utf-8'));
        // Wysłanie danych logowania do procesu renderowania
        event.sender.send('loginDataResponse', loginData);
    });  // Emitted when the window is closed.

    ipcMain.on('internet', (event) => {
        wifi.scan((error, networks) => {
            if (error) {
                console.log(error);
                event.sender.send('internetData', "");
                return;
            }
            event.sender.send('internetData', networks);


        });
    });
    ipcMain.on('internetConnect', (event, data) => {
        console.log(data.ssid);
        console.log(data.password);
        wifi.connect({ ssid: data.ssid, password: data.password }, (error) => {
            if (error) {
                console.log(error);
                return;
            }
            setTimeout(() => {
                try {
                    if (fs.existsSync(loginDataPath)) {
                        console.log(userDataPath)
                        mainWindow.loadFile('pages/index.html')
                    }
                    else {
                        mainWindow.loadFile('pages/loginPanel.html')
                    }
                } catch(err) {
                    console.error(err)
                }
            }, 2000);

            })
            // Wysłanie danych logowania do procesu renderowania

    });
    ipcMain.on('alarm', (event, data) => {
        fs.writeFileSync("./alarms.json", JSON.stringify(data));
    })

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
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
