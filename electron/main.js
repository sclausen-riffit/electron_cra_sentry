const Sentry = require("@sentry/electron");
const { app, BrowserWindow } = require("electron");
const path = require("path");
const convert = require("heic-convert");
Sentry.init({
  dsn: "",
});

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    preload: "sentry.js",
  });

  if (app.isPackaged || process.env.NODE_ENV === "test") {
    // 'build/index.html'
    win.loadFile(`${path.resolve(__dirname, "..", "index.html")}`);
  } else {
    win.loadURL("http://localhost:3000/index.html");

    win.once("ready-to-show", () => {
      win.show();
    });
  }
}
app.on("ready", createWindow);
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  } else {
    throw new Error("Test Error");
  }
});
app.on("activate", function () {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
