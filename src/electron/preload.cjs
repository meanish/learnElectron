const electron = require('electron')


electron.contextBridge.exposeInMainWorld('electron', {
    subscribeStatistics: callback => {

        /* receiver  send from the resource manager*/
        // electron.ipcRenderer.on("statistics", (_, stats) => {
        //     callback(stats)

        // })

        ipcOn("statistics", (stats) => {
            callback(stats)

        })
    },



    //subscribe to data every 5 sec 
    // getStaticData: () => console.log('static'), //frontend will later go get StaticData

    // getStaticData: () => electron.ipcRenderer.invoke("getStatiConsole")
    // 
    getStaticData: () => ipcInvoke("getStaticConsole")
})

function ipcOn(key, callback) {
    electron.ipcRenderer.on(key, (_, stats) => {
        callback(stats)

    })
}

function ipcInvoke(key) {
    electron.ipcRenderer.invoke(key)
}