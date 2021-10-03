import React,{useState , useEffect} from 'react'
import Chart from "react-apexcharts";

const NewChart = (props) => {

    let data ={
        options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: ['XS','S','M','L','XL','XXL']
        }
      },
      series: [
        {
          name: "ยอดขาย",
          data: [0,0,0,0,0,0]
        }
      ]}

    const [dataChart,setDataChart]=useState(data);

    const changData = () =>{
        let data1 ={
            options: {
            chart: {
              id: "basic-bar"
            },
            xaxis: {
              categories: Object.keys(props.P_Data)
            }
          },
          series: [
            {
              name: "ยอดขาย",
              data: Object.values(props.P_Data)
            }
          ]}

          setDataChart(data1)
    }

    useEffect(changData,[props.P_Data])

    return (
        <div>
            {props.P_Data?
            <Chart
            options={dataChart.options}
            series={dataChart.series}
            type="bar"
            width="40%"
          />
            :
           <Chart
              options={dataChart.options}
              series={dataChart.series}
              type="bar"
              width="300"
            />
            }
        </div>
    )
}

export default NewChart
