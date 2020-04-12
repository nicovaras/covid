import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Chart from "chart.js";
import 'chartjs-plugin-colorschemes'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Tooltip from 'rc-tooltip';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'react-bootstrap';


const Handle = Slider.Handle;

let myLineChart;



class LineGraph extends React.Component {
    chartRef = React.createRef();

    componentDidMount() {
        this.buildChart();
    }

    componentDidUpdate() {
        this.buildChart();
    }

    buildChart = () => {
        const myChartRef = this.chartRef.current.getContext("2d");
        const { data, labels } = this.props;

        if (typeof myLineChart !== "undefined") myLineChart.destroy();


        let datasets= [];
        for(let prov in data){
          datasets.push({
            label: prov,
            data: data[prov],
            fill:false,
            pointBorderWidth:5,
          });
        }

        myLineChart = new Chart(myChartRef, {
            type: "line",
            data: {
                //Bring in data
                labels: labels,
                datasets: datasets,
            },
            options: {
              elements: {line: {tension: 0}},
              animation:{duration:0},
              scales: {
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: 800
                    }
                }],
         }

            }
        });
    }

    render() {
        return (
            <div>
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}

class Summary extends React.Component {

  render() {

    const lastDay = this.props.lastDay;

    return (
      <Container class="header-container" fluid> 
        <Row className="justify-content-lg-center">
          <Col lg="3" class='header-part'>
            <div class='header-title'> Confirmados </div> 
            <div class='header-number'> {lastDay['total_infections']} 
              <span class='header-diff'> (+ {lastDay['new_cases']}) </span>
            </div> 
          </Col>
        
          <Col lg="auto" class='header-part'>
            <div class='header-title'> Muertes </div> 
            <div class='header-number'> {lastDay['total_deaths']} 
              <span class='header-diff'> (+ {lastDay['new_deaths']}) </span>
            </div> 
          </Col>
        </Row>
        <Row className='header-updated justify-content-lg-center'> Actualizado al: {this.props.day} </Row>

      </Container>
    );
  }

}


class Dashboard extends React.Component {
 

    constructor(props) {
      super(props);
      this.state = { covid: [], isLoading: true, error: null, provincesSelected: ['caba'], maxDay: 50 };
    }
  
  async componentDidMount() {
    try {
      const response = await fetch('https://argentina-covid19-data.now.sh/api/v0/daily/');
      const data = await response.json();
      this.setState({ covid: data, isLoading: false });
      console.log(data)
    } catch (error) {
      this.setState({ error: error.message, isLoading: false });
    }
  }

    selectProvince(province){
      if (this.state.provincesSelected.includes(province)){
        this.setState({provincesSelected: this.state.provincesSelected.filter((x) => {return x !== province})});
      } else{
        this.setState({provincesSelected: this.state.provincesSelected.concat(province)});
      }
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

    render() {
        const covid = this.state.covid;
        console.log(covid)

        if(covid.length === 0){
          return null;
        }

        let labels = [];
        for(let key in covid){
           labels.push(key);
        }

        const totalDays = labels.length;

        let data = {};
        for(let prov in covid[labels[0]]){
          data[prov] = [];
        }

        for(let day in covid){
          for(let prov in covid[day]){
            data[prov].push(covid[day][prov]['confirmed']);
          }
        }

        delete data['total_infections'];
        delete data['total_deaths'];
        delete data['new_cases'];
        delete data['new_deaths'];  

        let provinces = [];
        for(let province in data){
          provinces.push(<button key={province} onClick={() => this.selectProvince(province)} >{province}</button>);
        }

        let dataToShow = {};
        for(let prov in data){
          if(this.state.provincesSelected.includes(prov)){
            dataToShow[prov] = data[prov].slice(0, this.state.maxDay);
          }
        }
        
        // labels = labels.slice(0, this.state.maxDay);

        return (
            <Container >
            <header>
                <Summary lastDay={covid[labels[labels.length - 1]]} day={labels[labels.length - 1]} />
            </header>
                <h1>Confirmados por dia</h1>
                {provinces}
                <div>
                <br />
                  Dias
                  <Slider min={1} max={totalDays} defaultValue={totalDays-1} handle={this.handleSlider} onChange={(val) => this.changeSlider(val)} />
                </div>
                <LineGraph
                    data={dataToShow}
                    labels={labels} />            
            </Container>
        )
    }
}

// ========================================

ReactDOM.render(
  <Dashboard />,
  document.getElementById('root')
);

