import osUtils from 'os-utils';
import fs from "fs"
const Polling_Interval = 500;
import os from 'os'
import { BrowserWindow } from 'electron';
import { ipcWebContentSends } from './util.js';


export function pollRosource(mainContent) {
    setInterval(async () => {
        const cpuUsage = await getCpuUsage()
        const getRamUsage = getramUsage()
        const storageData = getStorageData()
        const StaticData = getStaticData()

        // ading the sender to display ion the browser console
        ipcWebContentSends('statistics', mainContent.webContents, {
            cpuUsage, getRamUsage, storageData, StaticData
        })


        // console.log({ cpuUsage, getRamUsage, storageData, StaticData })
    }, Polling_Interval)
}

/* get used cpu usage */
function getCpuUsage() {
    return new Promise(resolve => {
        osUtils.cpuUsage(resolve)
    })
}

/* get used ram usage */
function getramUsage() {
    return 1 - osUtils.freememPercentage();
}

/* getStorage Data */
function getStorageData() {
    const stats = fs.statfsSync(process.platform === 'win32' ? 'C://' : '/'); //get rootfile system basically gives whoe disk space 
    const total = stats.bsize * stats.blocks; //size of total block how many bites my disks have
    const free = stats.bsize * stats.bfree; //how much space is free
    return {
        total: Math.floor(total / 1_000_000_000), //toal space by gigbyte kilobye mb byte
        usage: 1 - free / total //used storage
    }
}

/* get static info about cpu like name, storage,  */

export function getStaticData() {
    const totalStorage = getStorageData()
    const cpuModel = os.cpus()[0].model; //[0] assuming only one cpu, model name in return (eg: Intel Core)
    const totalMemoryGB = Math.floor(osUtils.totalmem() / 1024); //total memory in gb /1024 for convert mb in gb
    return {
        totalStorage,
        cpuModel,
        totalMemoryGB
    }
} 