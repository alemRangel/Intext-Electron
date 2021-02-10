const { app, BrowserWindow,ipcMain } = require('electron')
const ejse = require('ejs-electron')
const dotenv = require('dotenv');
var path = require('path');


dotenv.config({ path: path.join(__dirname, process.env.IS_PROD ? ".env.prod" : ".env.dev") })
ejse.data({dummy_message:'Hola Erick',
          dummy_data:[{name:"Audi"},{name:"BMW"}],
          url: process.env.HOST_DIRECTORY})

var win;

function createWindow () {
   win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation:false
    }
  })
  win.webContents.openDevTools()
  win.loadFile('index.ejs')

}


app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

ipcMain.on('form-listener', async(event,arg) => {
  console.log(`Nombre Recibido ${arg}`);
  ejse.data({nombre:`${arg}`,url: process.env.HOST_DIRECTORy});
  win.loadFile("C:\\Users\\buffa\\Documents\\TrabajoErick\\Electron\\intext-electron\\result.ejs")
})

ipcMain.on('regresar', async(event,arg) =>{
  console.log(`Acción de regresar`);
  ejse.data({dummy_message:'Hola Erick',
            dummy_data:[{name:"Audi"},{name:"BMW"}],
            url: process.env.HOST_DIRECTORY})
  win.loadFile("C:\\Users\\buffa\\Documents\\TrabajoErick\\Electron\\intext-electron\\index.ejs")
})
