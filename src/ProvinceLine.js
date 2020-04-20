import React from 'react';
import {Line} from 'react-chartjs-2';
import Chart from "chart.js";

class ProvinceLine extends React.Component {
    render() {
        const data = this.props.data[this.props.province]

        let values=[];
        for(let day in data){
            values.push(data[day]['total_cases'])
        }

        const state ={
            labels: Array(values.length).fill(''),
            datasets: [{
                data: values,
                fill:false,
                borderColor:'#3f51b5',
                pointRadius:0
            }],
        };

        return (
            <div>
            <span className="province-line-title"> {this.props.province}</span>
            <span className="province-line-container">
                <div className="province-line-number"> {values[values.length - 1]}</div>
                <div className="province-line-cases">casos</div>
            </span>

                <Line
                    data={state}
                    options={
                        {       
                          responsive: true,
                          scales: {
                                xAxes: [{
                                    gridLines: {
                                        display:false
                                    }
                                }],
                                yAxes: [{
                                    ticks: {
                                        display:false,
                                        max: this.props.maxValue
                                    },
                                    gridLines: {
                                        display: false
                                    }   
                                }]
                          },
                          legend: { display: false},
                        }
                    }
                />

            </div>
        );
    }
}

export default ProvinceLine;