const electron = require('electron')


electron.contextBridge.exposeInMainWorld('electron', {
    subscribeStatistics: callback => {

        /* receiver  send from the resource manager*/
        electron.ipcRenderer.on("statistics", (_, stats) => {
            callback(stats)

        })
    }, //subscribe to data every 5 sec 
    // getStaticData: () => console.log('static'), //frontend will later go get StaticData

    getStaticData:()=>electron.ipcRenderer.invoke('getStaticConsole')

})