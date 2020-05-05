import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Title from './Title';

import Chart from "chart.js";
import 'chartjs-plugin-colorschemes'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Tooltip from 'rc-tooltip';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

let casesLineChart;
const Handle = Slider.Handle;

export default class CasesChart extends React.Component {
    chartRef = React.createRef();

    constructor(props) {
      super(props);
      this.state = {maxDay:500};
    }

    componentDidMount() {
        this.buildChart();
    }

    componentDidUpdate() {
        this.buildChart();
    }
    
    changeSlider(value){

      this.setState({maxDay: value});

    }


    handleSlider(props){
      const { value, dragging, index, ...restProps } = props;

      return (
        <Tooltip
          prefixCls="rc-slider-tooltip"
          overlay={value}
          visible={dragging}
          placement="top"
          key={index}
        >
          <Handle value={value} {...restProps} />
        </Tooltip>
      );
    };

    buildChart = () => {
        const myChartRef = this.chartRef.current.getContext("2d");
        const { data, labels } = this.props;
        const maxDay = this.state.maxDay;

        let dataToShow = {}

        for( let prov in data ){
          dataToShow[prov] = data[prov].slice(0, maxDay);
        }



        if (typeof casesLineChart !== "undefined") casesLineChart.destroy();


        let datasets= [];
        for(let prov in dataToShow){
          datasets.push({
            label: prov,
            data: dataToShow[prov],
            fill:false,
            pointBorderWidth:0,
          });
        }

        const maxValue = (Math.floor(this.props.maxValue/100) * 100) + 100;

        casesLineChart = new Chart(myChartRef, {
            type: "line",
            data: {
                //Bring in data
                labels: labels,
                datasets: datasets,
            },
            options: {
              // maintainAspectRatio: false,
              responsive:true,
              elements: {line: {tension: 0}},
              animation:{duration:0},
              scales: {
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: maxValue
                    },
                 
                }],
                xAxes: [{
                    gridLines: {
                      display:false
                    }   
                }],                
         }

            }
        });
    }

    render() {
        return (
          <React.Fragment>
            <Title> Casos Confirmados Por Día </Title>
            <div >
              <canvas 
                  id="myChart"
                  ref={this.chartRef}
              />
            </div>
            <div className='slider-container'>
              <Typography id="continuous-slider" gutterBottom>
                Dias
              </Typography>
              <Grid container spacing={2}>
                <Grid item>
                  <ChevronLeftIcon />
                </Grid>
                <Grid xs sm lg className="slider-main">
                  <Slider min={1} 
                      max={this.props.labels.length} 
                      defaultValue={this.props.labels.length-1} 
                      handle={this.handleSlider} 
                      onChange={(val) => this.changeSlider(val)} 
                      aria-labelledby="continuous-slider"

                      />
                </Grid>
                <Grid item>
                  <ChevronRightIcon />
                </Grid>

              </Grid>
            </div>
          </React.Fragment>
        )
    }
}
