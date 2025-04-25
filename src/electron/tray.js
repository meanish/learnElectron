import { app, Menu, Tray } from "electron";
import { getIconPath } from "./pathResolver.js";
import path from 'path'


export function createTray(mainWindow) {
    const newTray = new Tray(path.join(getIconPath(), process.platform === "darwin" ? "icons8(ios).png" : "icons8(win).png"))

    // add quit and show funct in tray icon
    const contextMenu = newTray.setContextMenu(
        Menu.buildFromTemplate([

            {
                label: 'Show',
                click: () => {
                    mainWindow.show();
                    if (app.dock) {
                        app.dock.show()
                    }
                }
            },
            {
                label: 'Quit',
                click: () => {
                    app.quit();
                },
                // type: "checkbox"
            },

        ])
    )

    newTray.setToolTip('basicElectron');
    newTray.setContextMenu(contextMenu);

    return newTray;
}