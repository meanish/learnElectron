import { app, Menu } from 'electron'
import React from 'react'
import { isDev } from './util.js'

export function createMenu(mainWindow) {
    // this is all for ios only
    Menu.setApplicationMenu(Menu.buildFromTemplate([
        {
            label: process.darwin === "darwin" ? undefined : "App",
            type: "submenu",
            submenu: [

                {
                    label: 'Quit',
                    click: app.quit,
                },
                {
                    label: 'DevTools',
                    click: () => mainWindow.webContents.openDevTools(),
                    visible: isDev()
                }

            ]
        },
        {
            label: "View",
            type: "submenu",
            submenu: [
                {
                    label: 'CPU',
                },
                {
                    label: 'RAM',
                },
                {
                    label: 'STORAGE',
                },

            ]
        },
    ]))
}

