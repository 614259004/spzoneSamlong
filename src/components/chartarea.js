
import React, { Component } from "react";
import Chart from "react-apexcharts";


class Chartarea extends Component {

  constructor(props) {
    super(props);

    this.state = {
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
          data: [30, 40, 45, 50, 49, 60, 70, 91, 40, 45, 50, 49]
        }
      ]
    };
  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            
            <Chart
                options={this.state.options}
                series={this.state.series}
                type="line"
                width="500"
            />
          </div>
        </div>
      </div>
    );
  }
}



export default Chartarea;

