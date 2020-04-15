import React from 'react';
import Chart from "chart.js";
import {Line} from 'react-chartjs-2';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class PerMillion extends React.Component {

    constructor(props){
        super(props);
        this.state = {selected:'Confirmed'};
    }

    toMillion(data, pop, col){
        return Number((1000000 * data[col])/pop).toFixed(2);
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
        let rows = [];

        for(let country in countries){
            let data = [];
            for(let i in countries[country]){
                data.push(this.toMillion(countries[country][i], pops[country], this.state.selected));
            }
            datasets.push({data: data.slice(-30), 
                           label: country,
                           fill:false,
                           pointBorderWidth:5,})
            const lastRow = countries[country][countries[country].length-1];
            rows.push({
                name: country,
                date: lastRow['Date'],
                cases: this.toMillion(lastRow, pops[country], 'Confirmed'),   
                deaths: this.toMillion(lastRow, pops[country], 'Deaths'),   
                recovered: this.toMillion(lastRow, pops[country], 'Recovered'),   
            })
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
            <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={9}>
                    <Paper>
                        <Line data={data}/>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={8} lg={3}>
                    <Paper>
                        <Button onClick={() => this.setState({selected:'Confirmed'})}> Confirmados </Button>
                        <Button onClick={() => this.setState({selected:'Deaths'})}> Muertes </Button>
                        <Button onClick={() => this.setState({selected:'Recovered'})}> Recuperados </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={8} lg={12}>
                    <TableContainer component={Paper}>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Pais</TableCell>
                            <TableCell>Fecha</TableCell>
                            <TableCell>Casos por millon</TableCell>
                            <TableCell>Muertes por millon</TableCell>
                            <TableCell>Recuperados por millon </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row) => (
                            <TableRow key={row.name}>
                              <TableCell component="th" scope="row">
                                {row.name}
                              </TableCell>
                              <TableCell >{row.date} </TableCell>
                              <TableCell >{row.cases}</TableCell>
                              <TableCell >{row.deaths}</TableCell>
                              <TableCell >{row.recovered}</TableCell>
                            </TableRow>
                          ))}                        
                        </TableBody>
                      </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        );

    }

}

export default PerMillion;
