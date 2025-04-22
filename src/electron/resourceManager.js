import osUtils from 'os-utils';
import fs from "fs"
const Polling_Interval = 500;

export function pollrosource() {
    setInterval(async () => {
        const cpuUsage = await getCpuUsage()
        const getRamUsage = getramUsage()
        const storageData = getStorageData()
        console.log({ cpuUsage, getRamUsage, storageData })
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

