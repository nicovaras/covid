import React from 'react';
import Chart from "chart.js";
import {Line} from 'react-chartjs-2';


class PerMillion extends React.Component {

    toMillion(data, pop){
        return (1000000 * data['Confirmed'])/pop;
    }

    render() {

        const countries = this.props.data;
        const pops ={
            argentina:  45195777,
            bolivia:    11383094,
            brazil:     212216052,
            chile:     19107216,
            paraguay: 7252672,
            uruguay:    3529014
        };

        let datasets = [];

        for(let country in countries){
            let data = [];
            for(let i in countries[country]){
                data.push(this.toMillion(countries[country][i], pops[country]))
            }
            datasets.push({data: data.slice(-30), 
                           label: country,
                           fill:false,
                           pointBorderWidth:5,})
        }

        let labels = [];

        for(let i in countries['argentina']){
            labels.push(countries['argentina'][i]['Date']);
        }
        labels = labels.slice(-30);

        const data = {
            labels: labels,
            datasets: datasets
        }

        return (
            <Line data={data}/>
        );

    }

}

export default PerMillion;
