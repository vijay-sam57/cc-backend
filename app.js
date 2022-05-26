const { app, BrowserWindow } = require("electron");

const loadMainWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL("http://localhost:3000");
};

app.on("ready", loadMainWindow);

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length == 0) {
    loadMainWindow();
  }
});

app.on("window-all-closed", () => {
  app.quit();
});
