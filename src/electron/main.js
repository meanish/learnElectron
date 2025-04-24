import { app, BrowserWindow, Tray } from 'electron'

import { ipcHandle, isDev } from './util.js'
import { getStaticData, pollRosource } from './resourceManager.js'
import { getIconPath, getPreloadPath, getUIPath } from './pathResolver.js'
import { createTray } from './tray.js'


const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        // this can be checked in the dev tools console throug windows.electron.say(subscribeStatistics(()=>console.log(1)))
        webPreferences: {
            preload: getPreloadPath(),
        }
    })

    /* if main window ruun local vite else run production file */
    if (isDev()) {
        win.loadURL('http://localhost:5123/')
    } else {
        win.loadFile(getUIPath())
    }
    pollRosource(win)

    ipcHandle("getStaticConsole", () => getStaticData())

    // icon tray for ios and win
    // new Tray(path.join(getIconPath(), process.platform === "darwin" ? "icons8(ios)" : "icons8(win).png"))
    createTray(win)



    // prevent tray to diapear even after app closes
    // win.on('close', (e) => {
    //     e.preventDefault() //using this prevents to close the electron app even using X

    // })
    handleCloseEvents(win)

    /* 
    Q. How to actually close electron
    a. all windows close => "before-event"-event => app stops
    b. ""before-quit" event => all windows get closed => app stops
    */

    function handleCloseEvents(win) {
        let willClose = false

        if (willClose) { return }


        win.on('close', (e) => {
            e.preventDefault() //using this prevents to close the electron app even using X
            win.hide()
            // for mac
            if (app.dock) {
                app.dock.hide()
            }


        })


        app.on('before-quit', () => {
            willClose = true;
        })

        win.on('show', () => {
            willClose = false;
        })
    }
}


app.whenReady().then(() => {
    createWindow()
}) 