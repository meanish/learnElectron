import RenderLineChart from "./recharts";


const Charts = (props) => {
    console.log(props)
    return (
        <RenderLineChart data={props.data} />
    );
}


export default Charts
