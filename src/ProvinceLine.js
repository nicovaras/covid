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
                pointStyle:'line'
            }],
        };

        return (
            <div>
            {this.props.province}
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
                                        display:false
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