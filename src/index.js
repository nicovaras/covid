import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Chart from "chart.js";
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

        myLineChart = new Chart(myChartRef, {
            type: "line",
            data: {
                //Bring in data
                labels: labels,
                datasets: [
                    {
                        label: "Confirmados",
                        data: data,
                        fill: false,
                        borderColor: "#6610f2"
                    }
                ]
            },
            options: {
                //Customize chart options

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


class Dashboard extends React.Component {
 

    constructor(props) {
      super(props);
      this.state = { covid: [], isLoading: true, error: null, provincesSelected: ['caba'] };
    }
  
  async componentDidMount() {
    try {
      const response = await fetch('https://argentina-covid19-data.now.sh/api/v0/daily/');
      const data = await response.json();
      this.setState({ covid: data, isLoading: false });
    } catch (error) {
      this.setState({ error: error.message, isLoading: false });
    }
  }

    render() {
        const covid = this.state.covid;
        if(covid.length === 0){
          return null;
        }

        let data = [];
        let labels = [];

        for(let key in covid){
           labels.push(key);
           console.log(covid[key])
           console.log(this.state.provincesSelected[0])
           data.push(covid[key][this.state.provincesSelected[0]]['confirmed']);
        }

        let provinces = [];
        for(let key in covid){
          for(let province in covid[key]){
            provinces.push(<button key={province} onClick={() => this.setState({provincesSelected: [province]})} >{province}</button>);
          }
          break;
        }


        return (
            <div >
            <header>
                <h1>Confirmados</h1>
            </header>
                {provinces}
                <LineGraph
                    data={data}
                    labels={labels} />            
            </div>
        )
    }
}

// ========================================

ReactDOM.render(
  <Dashboard />,
  document.getElementById('root')
);

