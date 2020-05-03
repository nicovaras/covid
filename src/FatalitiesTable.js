import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import CasesMiniBar from './CasesMiniBar'
import Title from './Title';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  table: {
    // maxWidth: 1000,
  },
 container: {
    // maxWidth:1000,
    maxHeight: 600,
  },
});

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
    <Title> Visión General Por Provincia </Title>
    <Grid container>
    <Grid item lg={1}>
    </Grid>
    <Grid item lg={10}>
    <Paper>
        <TableContainer className={classes.container}>
          <Table stickyHeader className={classes.table} >
            <TableHead>
              <TableRow>
                <StyledTableCell>Provincia</StyledTableCell>
                <StyledTableCell>Casos por día</StyledTableCell>
                <StyledTableCell>Total casos</StyledTableCell>
                <StyledTableCell>Muertes</StyledTableCell>
                <StyledTableCell> Fatalidad % </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <StyledTableCell ><CasesMiniBar data={props['data'][row['name']]}/> </StyledTableCell>
                  <StyledTableCell >{row.total_cases} (+{row.prev_cases})</StyledTableCell>
                  <StyledTableCell >{row.total_deaths} (+{row.prev_deaths})</StyledTableCell>
                  <StyledTableCell >{row.fatality} %</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    </Paper>
    </Grid>
    </Grid>
    </div>
  );
}
