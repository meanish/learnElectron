const electron = require('electron')


electron.contextBridge.exposeInMainWorld('electron', {
    // subscribeStatistics: callback => {

    //     /* receiver  send from the resource manager*/
    //     // electron.ipcRenderer.on("statistics", (_, stats) => {
    //     //     callback(stats)

    //     // })

    //     ipcOn("statistics", (stats) => {
    //         callback(stats)

    //     })
    // },

    // unsubscribing to stop the interval that consoling
    subscribeStatistics: callback => {

        /* receiver  send from the resource manager*/
        // electron.ipcRenderer.on("statistics", (_, stats) => {
        //     callback(stats)

        // })

        return ipcOn("statistics", (stats) => {
            callback(stats)

        })
    },


    //subscribe to data every 5 sec 
    // getStaticData: () => console.log('static'), //frontend will later go get StaticData

    // getStaticData: () => electron.ipcRenderer.invoke("getStaticConsole")
    //
    getStaticData: () => ipcInvoke("getStaticConsole")
})

function ipcOn(key, callback) {

    const cb = (_, payload) => callback(payload)

    // //    to subscribe
    // electron.ipcRenderer.on(key, (_, stats) => {
    //     callback(stats)

    // })

    // // to unsubscribe
    // electron.ipcRenderer.off(key, (_, stats) => {
    //     callback(stats)

    // })

    //    to subscribe
    electron.ipcRenderer.on(key, cb)

    // to unsubscribe
    electron.ipcRenderer.off(key, cb)

}

function ipcInvoke(key) {
    return electron.ipcRenderer.invoke(key)
}