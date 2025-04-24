import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// const data = [
//     {
//         value: 25,
//     },
//     {
//         value: 40,
//     },
//     {
//         value: 30,
//     },
//     {
//         value: 100,
//     },
// ];

const RenderLineChart = (props) => {
    console.log("ABr", props.data)
    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <AreaChart
                    data={props.data}
                >

                    <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" strokeWidth={3} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}


export default RenderLineChart