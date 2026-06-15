const { app, BrowserWindow, dialog, ipcMain } = require("electron");
const path = require("path");
const { fetchFreshTerms } = require("./web-updater");
const { extractTermsFromPdf } = require("./pdf-terms");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1180,
    height: 780,
    minWidth: 560,
    minHeight: 480,
    title: "ことばクエスト",
    backgroundColor: "#eef3ee",
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.js")
    }
  });

  mainWindow.loadFile(path.join(__dirname, "index.html"));
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.handle("terms:refresh", async () => {
  return fetchFreshTerms();
});

ipcMain.handle("terms:choosePdf", async () => {
  const result = await dialog.showOpenDialog({
    title: "PDFから用語を作る",
    properties: ["openFile"],
    filters: [{ name: "PDF", extensions: ["pdf"] }]
  });

  if (result.canceled || !result.filePaths.length) {
    return null;
  }

  const filePath = result.filePaths[0];
  const fileName = path.basename(filePath);
  const extraction = await extractTermsFromPdf(filePath, fileName);

  return {
    path: filePath,
    name: fileName,
    ...extraction
  };
});
