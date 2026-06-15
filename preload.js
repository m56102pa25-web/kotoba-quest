const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("kotobaQuest", {
  choosePdf: () => ipcRenderer.invoke("terms:choosePdf"),
  refreshTerms: () => ipcRenderer.invoke("terms:refresh")
});
