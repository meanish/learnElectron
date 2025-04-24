import React, { useEffect, useState } from 'react'

const UseStatistics = (dataCount) => {
    const [value, setValue] = useState([])

    useEffect(() => {
        const unsub = window.electron.subscribeStatistics((stats) => {
            setValue((pre) => {
                return [...pre, stats]
            })
        })
        return unsub
    }, [])


    return value
}

export default UseStatistics
