'use strict'
electron = require 'electron'
app = electron.app
BrowserWindow = electron.BrowserWindow
mainWindow = null

appOnWindowAllClosed = () ->app.quit()
appOnReady = () ->
    windowSize =
        width: 800
        height: 600
    mainWindow = new BrowserWindow windowSize
    mainWindow.loadURL 'file://'+__dirname+'/activity/register.html'
    mainWindow.webContents.openDevTools()

app.on 'ready', appOnReady
app.on 'window-all-closed', appOnWindowAllClosed
