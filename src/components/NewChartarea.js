import React,{useState , useEffect} from 'react'
import Chart from "react-apexcharts";

const NewChartarea = (props) => {

    let data ={
        options: {
            chart: {
              id: "basic-bar"
            },
            xaxis: {
              categories: ['ม.ค','ก.พ','มี.ค','เม.ย','พ.ค','มิ.ย','ก.ค','ส.ค','ก.ย','ต.ค','พ.ย','ธ.ค']
            }
          },
          series: [
            {
              name: "ยอดขาย",
              data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
          ]
    }

    const [dataChartA,setDataChartA]=useState(data);
    const changData = () =>{
        let data1 ={
            options: {
                chart: {
                id: "basic-bar"
                },
                xaxis: {
                categories: ['ม.ค','ก.พ','มี.ค','เม.ย','พ.ค','มิ.ย','ก.ค','ส.ค','ก.ย','ต.ค','พ.ย','ธ.ค']
                }
            },
            series: [
                {
                name: "ยอดขาย",
                data: Object.values(props.Y_data)
                }
            ]
        }

        setDataChartA(data1);
    }
    useEffect(changData,[props.Y_data])
    return (
        <div>
            {props.Y_data ?
            <Chart
                options={dataChartA.options}
                series={dataChartA.series}
                type="line"
                width="500"
            />:
            null}
        </div>
    )
}

export default NewChartarea
