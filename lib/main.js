'use strict';
var BrowserWindow, app, appOnReady, appOnWindowAllClosed, electron, mainWindow;

electron = require('electron');

app = electron.app;

BrowserWindow = electron.BrowserWindow;

mainWindow = null;

appOnWindowAllClosed = function() {
  return app.quit();
};

appOnReady = function() {
  var windowSize;
  windowSize = {
    width: 800,
    height: 600
  };
  mainWindow = new BrowserWindow(windowSize);
  mainWindow.loadURL('file://' + __dirname + '/activity/register.html');
  return mainWindow.webContents.openDevTools();
};

app.on('ready', appOnReady);

app.on('window-all-closed', appOnWindowAllClosed);
