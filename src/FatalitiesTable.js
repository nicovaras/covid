import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import CasesMiniBar from './CasesMiniBar'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function FatalitiesTable(props) {
  const classes = useStyles();
  let rows = [];
  const days = Object.keys(props.data['CABA']);
  let prevDay = days[days.length - 2];
  let lastDay = days[days.length - 1];

  if (props.data['CABA'][lastDay]['total_cases'] === 0){
    prevDay = days[days.length - 3];
    lastDay = days[days.length - 2];    
  }

  for(let province in props.data){
    const total_cases = props.data[province][lastDay]['total_cases'];
    const prev_cases = props.data[province][prevDay]['total_cases'];
    const total_deaths = props.data[province][lastDay]['total_deaths'];
    const prev_deaths = props.data[province][prevDay]['total_deaths'];
    let fatality;
    if (total_cases > 0){
        fatality = Number((total_deaths/total_cases * 100).toFixed(2));
    } else {
        fatality = 0;
    }

    rows.push({
        name: province,
        total_cases: total_cases,
        total_deaths: total_deaths,
        fatality: fatality,
        prev_cases: total_cases - prev_cases,
        prev_deaths: total_deaths - prev_deaths
    })
  }


  return (
    <div> 
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Provincia</TableCell>
            <TableCell>Casos por dia</TableCell>
            <TableCell>Total casos</TableCell>
            <TableCell>Muertes</TableCell>
            <TableCell> Fatalidad % </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell ><CasesMiniBar data={props['data'][row['name']]}/> </TableCell>
              <TableCell >{row.total_cases} (+{row.prev_cases})</TableCell>
              <TableCell >{row.total_deaths} (+{row.prev_deaths})</TableCell>
              <TableCell >{row.fatality} %</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
