const { contextBridge, ipcRenderer } = require("electron");

/** Narrow file-library API for the renderer; no direct fs or ipc access. */
contextBridge.exposeInMainWorld("desktop", {
  folder: () => ipcRenderer.invoke("maps:folder"),
  pickFolder: () => ipcRenderer.invoke("maps:pickFolder"),
  list: () => ipcRenderer.invoke("maps:list"),
  write: (file, name, tree) => ipcRenderer.invoke("maps:write", file, name, tree),
  rename: (file, name) => ipcRenderer.invoke("maps:rename", file, name),
  remove: (file) => ipcRenderer.invoke("maps:remove", file),
  reveal: () => ipcRenderer.invoke("maps:reveal")
});
