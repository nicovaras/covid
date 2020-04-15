import React from 'react';
import Chart from "chart.js";
import './index.css';
import {Bar} from 'react-chartjs-2';

class CasesMiniBar extends React.Component {

    render() {
        let data = this.props.data;
        const days = Object.keys(data).slice(-30);

        let values = []
        for(let i in days){
            values.push(data[days[i]]['total_cases']);
        }

        const state ={
            labels: Array(30).fill(''),
            datasets: [{
                barPercentage: 1.0,
                categoryPercentage:1.0,
                borderWidth:1,
                data: values
            }],
        };

        return (
            <div  className="minicanvas">
                <Bar
                    height={95}
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
                                    // display:false,
                                    ticks: {
                                        display:false
                                        // fontSize: 10,
                                        // callback: function(value, index, values) {
                                        //   if (index === values.length - 1) return Math.min.apply(this, values);
                                        //   else if (index === 0) return Math.max.apply(this, values);
                                        //   else return '';
                                        // }
                                    },
                                    gridLines: {
                                        drawBorder: false
                                        // display:false
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

export default CasesMiniBar;