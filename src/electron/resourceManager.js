import osUtils from 'os-utils'
const Polling_Interval = 500;

export function pollrosource() {
    setInterval(() => { getCpuUsage() }, Polling_Interval)
}


function getCpuUsage() {
    osUtils.cpuUsage((percentage) => console.log(percentage))
}