import React,{useState , useEffect} from 'react'
import Chart   from "react-apexcharts";

const NewDonut = (props) => {
    let data ={
        options: {series: [44, 55, 41, 17, 15],
        labels: ['A', 'B', 'C', 'D', 'E']},
        
    }

    const [donutChart,setDonutChart]=useState(data);

    const changData = () =>{
        let data1 ={
            options: {
            series: props.B_data,
            labels: props.B_Na
        }
            
        }

        setDonutChart(data1)
    }

    useEffect(changData,[props])
    

    return (
        <div >
            <Chart   options={donutChart.options} series={donutChart.options.series} type="donut"  width="450" />
      </div>
    )
}

export default NewDonut
