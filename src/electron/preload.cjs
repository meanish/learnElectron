const electron = require('electron')


electron.contextBridge.exposeInMainWorld('electron', {
    subscribeStatistics: callback => callback({}), //subscribe to data every 5 sec 
    getStaticData: () => console.log('static'), //frontend will later go get StaticData

})