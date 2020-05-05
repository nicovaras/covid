import React from 'react';
import Chart from "chart.js";
import {Line} from 'react-chartjs-2';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Title from './Title';

class DoubleDays extends React.Component {

    render() {
        let dates = [];
        let cases = [];
        for(let date in this.props.data){
            dates.push(date);
            cases.push(this.props.data[date]['total_cases'])
        }
        
        let doubles = [];
        for(let i = 0; i < cases.length; i++) {
            let double = null;
            for(let j = i+1; j < cases.length; j++) {
                if(cases[i] * 2 <= cases[j]){
                    double = (j-i);
                    break;
                }
            }
            if(double !== null){
                doubles.push(double)
            } else {
                break;
            }
        }

        const datasets = [{
           data: doubles, 
           fill:false,
           pointBorderWidth:5
        }];

        const data = {
            labels: dates.slice(0, doubles.length),
            datasets: datasets,

        }

        const options = {
            responsive: true,
              legend: {
                display: false
              },
              scales: {
                yAxes: [{
                  scaleLabel: {
                    display: true,
                    labelString: 'Días'
                  }
                }]
              }            
        }


        return(
            <React.Fragment>
            <Paper className="paper-double">
                <Title> Días hasta duplicar casos</Title>
                <Line data={data} options={options}/>
            </Paper>
            
            <div className="note">
                Nota: se muestra hasta el último día en el que hubo un día posterior con el doble de casos
            </div>

            </React.Fragment>
        );
    }

}

export default DoubleDays;
