import { app, BrowserWindow } from 'electron'

import path from 'path'
import { isDev } from './util.js'
import { pollrosource } from './resourceManager.js'
import { getPreloadPath } from './pathResolver.js'


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

        win.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'))
    }
    pollrosource()
}


app.whenReady().then(() => {
    createWindow()
})