import path from 'path'
// import { isDev } from './util'
import { app } from 'electron'

export function getPreloadPath() {
    return path.join(
        app.getAppPath(),
        "src/electron/preload.cjs"
    )
}