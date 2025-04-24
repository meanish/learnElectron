import { useEffect, useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RenderLineChart from './components/recharts'
import { useStatistics } from './electron/useStatistics'
import Charts from './components/charts'

function App() {
  const [count, setCount] = useState(0)

  //consoled in the terminal
  // this is working just beacuse of the extraResouce==rces placement ion package.json
  // window.electron.getStaticData()

  // to subscribe
  // useEffect(() => {
  //   window.electron.subscribeStatistics((stats) => console.log(stats))
  // }, [])


  // to unsubscribe
  // useEffect(() => {
  //   const unsub = window.electron.subscribeStatistics((stats) => console.log(stats))
  //   return unsub
  // }, [])



  const statisticValue = useStatistics(10)
  const cpuUsage = useMemo(() => statisticValue.map((stat) => {

    return ({
      value: stat.cpuUsage * 100
    })

  }), [statisticValue])


  console.log(statisticValue, "cpuUsage", cpuUsage)
  return (
    <>
      <div>
        123
        <div className="charts" style={{ height: "100px" }}><Charts data={cpuUsage} /> </div>
        {/* <div className="div" style={{ width: "100%" }}><RenderLineChart /></div> */}
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is 100{count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
