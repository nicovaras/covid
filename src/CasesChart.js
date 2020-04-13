import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Title from './Title';

import Chart from "chart.js";
import 'chartjs-plugin-colorschemes'
let casesLineChart;

export default class CasesChart extends React.Component {
    chartRef = React.createRef();

    componentDidMount() {
        this.buildChart();
    }

    componentDidUpdate() {
        this.buildChart();
    }

    buildChart = () => {
        const myChartRef = this.chartRef.current.getContext("2d");
        const { data, labels } = this.props;

        if (typeof casesLineChart !== "undefined") casesLineChart.destroy();


        let datasets= [];
        for(let prov in data){
          datasets.push({
            label: prov,
            data: data[prov],
            fill:false,
            pointBorderWidth:5,
          });
        }

        casesLineChart = new Chart(myChartRef, {
            type: "line",
            data: {
                //Bring in data
                labels: labels,
                datasets: datasets,
            },
            options: {
              // maintainAspectRatio: false,
              responsive:true,
              elements: {line: {tension: 0}},
              animation:{duration:0},
              scales: {
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: 800
                    }
                }],
         }

            }
        });
    }

    render() {
        return (
          <React.Fragment>
            <Title> Confirmados por dia </Title>
            <div>
              <canvas 
                  id="myChart"
                  ref={this.chartRef}
              />
            </div>
          </React.Fragment>
        )
    }
}
