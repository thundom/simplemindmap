const { app, BrowserWindow, ipcMain, dialog, shell } = require("electron");
const path = require("path");
const fs = require("fs/promises");

let configPath = null;
let config = {};

async function loadConfig() {
  configPath = path.join(app.getPath("userData"), "config.json");
  try {
    config = JSON.parse(await fs.readFile(configPath, "utf8"));
  } catch (e) {
    config = {};
  }
  if (!config.folder) {
    config.folder = path.join(app.getPath("documents"), "Simple Mindmap");
  }
  await ensureFolder();
}

async function ensureFolder() {
  try {
    await fs.mkdir(config.folder, { recursive: true });
  } catch (e) {
    // fall back to userData if the chosen folder is gone or unwritable
    config.folder = path.join(app.getPath("userData"), "maps");
    await fs.mkdir(config.folder, { recursive: true });
  }
  return config.folder;
}

async function saveConfig() {
  try {
    await fs.writeFile(configPath, JSON.stringify(config, null, 2), "utf8");
  } catch (e) { /* preference is best-effort */ }
}

function safeBase(name) {
  const v = String(name).replace(/[\\/:*?"<>|]/g, "").replace(/\s+/g, " ").trim().slice(0, 60);
  return v || "mindmap";
}

/** Pick a filename that doesn't collide with an existing different map. */
async function freeName(base, keepFile) {
  const names = new Set(await listFiles());
  let candidate = base + ".json";
  let i = 2;
  while (names.has(candidate) && candidate !== keepFile) {
    candidate = base + " (" + i++ + ").json";
  }
  return candidate;
}

async function listFiles() {
  try {
    const entries = await fs.readdir(config.folder);
    return entries.filter((f) => f.toLowerCase().endsWith(".json"));
  } catch (e) {
    return [];
  }
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1360,
    height: 860,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.js")
    }
  });
  win.loadFile(path.join(__dirname, "..", "index.html"));
}

ipcMain.handle("maps:folder", async () => config.folder);

ipcMain.handle("maps:pickFolder", async () => {
  const res = await dialog.showOpenDialog({
    title: "选择导图保存位置",
    defaultPath: config.folder,
    properties: ["openDirectory", "createDirectory"]
  });
  if (res.canceled || !res.filePaths.length) return { folder: config.folder, changed: false };
  config.folder = res.filePaths[0];
  await ensureFolder();
  await saveConfig();
  return { folder: config.folder, changed: true };
});

ipcMain.handle("maps:list", async () => {
  await ensureFolder();
  const files = await listFiles();
  const out = [];
  for (const file of files) {
    const full = path.join(config.folder, file);
    try {
      const [raw, stat] = await Promise.all([fs.readFile(full, "utf8"), fs.stat(full)]);
      const doc = JSON.parse(raw);
      const tree = doc.tree || doc;
      if (!tree || typeof tree.text !== "string") continue;
      out.push({
        id: file,
        file: file,
        name: doc.name || tree.text,
        savedAt: doc.savedAt || stat.mtime.toISOString(),
        tree: tree
      });
    } catch (e) { /* skip files that aren't our maps */ }
  }
  return out;
});

ipcMain.handle("maps:write", async (_e, file, name, tree) => {
  await ensureFolder();
  const target = file || (await freeName(safeBase(name), null));
  const payload = {
    app: "simplemindmap",
    version: 1,
    name: name,
    savedAt: new Date().toISOString(),
    tree: tree
  };
  await fs.writeFile(path.join(config.folder, target), JSON.stringify(payload, null, 2), "utf8");
  return { file: target, savedAt: payload.savedAt };
});

ipcMain.handle("maps:rename", async (_e, file, name) => {
  await ensureFolder();
  const full = path.join(config.folder, file);
  const doc = JSON.parse(await fs.readFile(full, "utf8"));
  doc.name = name;
  const target = await freeName(safeBase(name), file);
  await fs.writeFile(full, JSON.stringify(doc, null, 2), "utf8");
  if (target !== file) {
    await fs.rename(full, path.join(config.folder, target));
    return { file: target };
  }
  return { file: file };
});

ipcMain.handle("maps:remove", async (_e, file) => {
  const full = path.join(config.folder, file);
  const err = await shell.trashItem(full).then(() => null, (e) => e);
  if (err) await fs.unlink(full);   // no recycle bin available — delete outright
  return { trashed: !err };
});

ipcMain.handle("maps:reveal", async () => {
  await ensureFolder();
  await shell.openPath(config.folder);
  return config.folder;
});

app.whenReady().then(async () => {
  await loadConfig();
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
