import { app, Menu, Tray } from "electron";
import { getIconPath } from "./pathResolver.js";
import path from 'path'


export function createTray(mainWindow) {
    const newTray = new Tray(path.join(getIconPath(), process.platform === "darwin" ? "icons8(ios).png" : "icons8(win).png"))

    // add quit funct in tray
    const contextMenu = newTray.setContextMenu(
        Menu.buildFromTemplate([
            {
                label: 'Quit',
                click: () => {
                    app.quit();
                }
            }
        ])
    )

    newTray.setToolTip('basicElectron');
    newTray.setContextMenu(contextMenu);

    return newTray;
}