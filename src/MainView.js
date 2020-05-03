import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Summary from './Summary';
import Switch from '@material-ui/core/Switch';
import CasesChart from './CasesChart';
import clsx from 'clsx';
import Checkbox from '@material-ui/core/Checkbox';

class MainView extends React.Component{
      constructor(props) {
        super(props);
        this.state = {  provincesSelected: ['CABA'], maxDay: 100 };
      }

    selectProvince(province){
      if (this.state.provincesSelected.includes(province)){
        this.setState({provincesSelected: this.state.provincesSelected.filter((x) => {return x !== province})});
      } else{
        this.setState({provincesSelected: this.state.provincesSelected.concat(province)});
      }
    }

    render(){
        const classes = this.props.classes;
        const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
        const covid = this.props.covid;

        let days = [];
        for(let day in covid['totals']){
           days.push(day);
        }

        const totalDays = days.length;

        let data = {};
        for(let prov in covid['data']){
          data[prov] = [];
        }

        for(let prov in covid['data']){
          for(let day in covid['data'][prov]){
            data[prov].push(covid['data'][prov][day]['total_cases']);
          }
        }

        let provinces = [];
        for(let i in covid['provinces']){
          let province = covid['provinces'][i];
          provinces.push(
             <FormControlLabel
              key={"switch-" + province}
              control={<Checkbox color='primary' 
                               onChange={() => this.selectProvince(province)}
                               checked={this.state.provincesSelected.includes(province)} >
                       </Checkbox>}
              label={province}
              />
            );
        }

        let dataToShow = {};
        for(let prov in data){
          if(this.state.provincesSelected.includes(prov)){
            dataToShow[prov] = data[prov].slice(0, this.state.maxDay);
          }
        }

        let maxValue;
        if( data['CABA'][data['CABA'].length -1] > 0){
            maxValue = data['CABA'][data['CABA'].length -1];

        } else {
            maxValue = data['CABA'][data['CABA'].length -2];

        }


        return (
            <React.Fragment>
  
                <Grid container spacing={3}>
                  <Grid item xs={12} md={8} lg={9}>
                    <Paper className={fixedHeightPaper}>
                      <CasesChart  data={dataToShow}
                        labels={days} maxValue={maxValue}/>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4} lg={3}>
                    <Paper className={fixedHeightPaper}>
                      <FormGroup>
                        {provinces}
                      </FormGroup>
                    </Paper>
                  </Grid>
                </Grid>
            </React.Fragment>
        );

    }
}

export default MainView;