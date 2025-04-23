import { ipcMain } from "electron"
import { getUIPath } from "./pathResolver.js"
import { pathToFileURL } from "url"

export function isDev() {
    return process.env.NODE_ENV === "development"
}


// key mwnas what is invoked say "statistics" and handler is the function of the what to return
export function ipcHandle(key, handler) {
    ipcMain.handle(key, (event) => {
        validateEventFrame(event.senderFrame) //event prevent validation strict
        return handler()
    })
}


// to send to the browser
export function ipcWebContentSends(key, webContents, payload) {
    webContents.send(key, payload)
}

/* checking if the source providing the data to the ipc is from true source */
export function validateEventFrame(frame) {
    console.log("Actual host url", frame.url, "isDEv", isDev)
    // checking if in dev ecnveironement && .url.host cuts all the https and left with the localhost
    if (isDev() && new URL(frame.url).host === "localhost:5123") {
        return;
    }
    if (frame.url !== pathToFileURL(getUIPath()).toString()) {
        throw new Error('Malicious Event')
    }
}