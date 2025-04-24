import React, { useEffect, useState } from 'react'

export function useStatistics(dataCount) {
    const [value, setValue] = useState([])


    useEffect(() => {
        const unsub = window.electron.subscribeStatistics((stats) => {
            setValue((pre) => {
                const newData = [...pre, stats];

                // basically if the newData is bigger than the count remove the top value fro array
                if (newData.length > dataCount) {
                    newData.shift()
                }
                return newData
            })
        })
        return unsub
    }, [])


    return value
}

