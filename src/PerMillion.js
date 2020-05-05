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
import Title from './Title';
import { withStyles, makeStyles } from '@material-ui/core/styles';


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

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

        const countryMap = {
            'argentina': 'Argentina',
            'brazil': 'Brasil',
            'bolivia': 'Bolivia',
            'chile': 'Chile',
            'paraguay': 'Paraguay',
            'uruguay': 'Uruguay'
        }

        for(let country in countries){
            let data = [];
            for(let i in countries[country]){
                data.push(this.toMillion(countries[country][i], pops[country], this.state.selected));
            }
            datasets.push({data: data.slice(-30), 
                           label: countryMap[country],
                           fill:false,
                           pointBorderWidth:5,})
            const lastRow = countries[country][countries[country].length-1];
            rows.push({
                name: countryMap[country],
                date: lastRow['Date'].slice(0,10),
                population:pops[country],
                cases: this.toMillion(lastRow, pops[country], 'Confirmed'),   
                deaths: this.toMillion(lastRow, pops[country], 'Deaths'),   
                recovered: this.toMillion(lastRow, pops[country], 'Recovered'),   
            })
        }

        let labels = [];

        for(let i in countries['argentina']){
            labels.push(countries['argentina'][i]['Date'].slice(0,10));
        }
        labels = labels.slice(-30);

        const data = {
            labels: labels,
            datasets: datasets
        }

        const options = {
            maintainAspectRatio: false,
            responsive: true,
            elements: {line: {tension: 0}},
            animation:{duration:0},            
            scales: {
                xAxes: [{
                    gridLines: {
                      display:false
                    }   
                }],                
            }            
        }


        return (
            <React.Fragment>
            

            <Grid container spacing={3}>

                <Grid item lg={12}>


                    <Paper className="paper-million">
                        <Grid container lg={12}>
                            <Grid item lg={7}>
                                <Title> Datos Por Millón De Habitantes</Title>
                            </Grid>
                            <Grid item lg={5}>
                                <Button variant="outlined" onClick={() => this.setState({selected:'Confirmed'})}> Confirmados </Button>
                                <Button variant="outlined" onClick={() => this.setState({selected:'Deaths'})}> Muertes </Button>
                                <Button variant="outlined" onClick={() => this.setState({selected:'Recovered'})}> Recuperados </Button>
                            </Grid>
                        </Grid>
                        <Grid container lg={12}>
                            <Grid item lg={11}>
                                <Line data={data} options={options} height={380} width={800}/>
                            </Grid>
                        </Grid>
                        
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item lg={1} />
                <Grid item lg={10}>
                    <TableContainer component={Paper}>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>País</StyledTableCell>
                            <StyledTableCell>Fecha</StyledTableCell>
                            <StyledTableCell>Población</StyledTableCell>
                            <StyledTableCell>Casos por millón</StyledTableCell>
                            <StyledTableCell>Muertes por millón</StyledTableCell>
                            <StyledTableCell>Recuperados por millón </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row) => (
                            <TableRow key={row.name}>
                              <TableCell component="th" scope="row">
                                {row.name}
                              </TableCell>
                              <TableCell >{row.date} </TableCell>
                              <TableCell >{row.population} </TableCell>
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
            <div className="note">
                Nota: sólo paises limítrofes
            </div>
            </React.Fragment>
        );

    }

}

export default PerMillion;
