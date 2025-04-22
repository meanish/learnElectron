import { ipcMain } from "electron"


export function isDev() {
    return process.env.NODE_ENV === "development"
}


// key mwnas what is invoked say "statistics" and handler is the function of the what to return
export function ipcHandle(key, handler) {
    ipcMain.handle(key, () => handler())
}

// to send to the browser
export function ipcWebContentSends(key, webContents, payload) {
    webContents.send(key, payload)
}

