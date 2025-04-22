import osUtils from 'os-utils'
const Polling_Interval = 500;

export function pollrosource() {
    setInterval(async () => {
        const cpuUsage = await getCpuUsage()
        const getRamUsage = getramUsage()
        console.log({ cpuUsage, getRamUsage })
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