import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Tooltip from 'rc-tooltip';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'react-bootstrap';

import Button from '@material-ui/core/Button';
import Dashboard from './Dashboard';

const Handle = Slider.Handle;

let myLineChart;




class Summary extends React.Component {

  render() {

    const lastDay = this.props.lastDay;

    return (
      <Container class="header-container" fluid> 
        <Row className="justify-content-lg-center">
          <Col lg="3" class='header-part'>
            <div class='header-title'> Confirmados </div> 
            <div class='header-number'> {lastDay['total_cases']} 
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


// class Dashboard extends React.Component {
 

//     constructor(props) {
//       super(props);
//       this.state = { covid: [], isLoading: true, error: null, provincesSelected: ['CABA'], maxDay: 50 };
//     }
  
//   async componentDidMount() {
//     try {
//       const response = await fetch('https://covid.null.com.ar/');
//       const data = await response.json();
//       this.setState({ covid: data, isLoading: false });
//     } catch (error) {
//       this.setState({ error: error.message, isLoading: false });
//     }
//   }

//     selectProvince(province){
//       if (this.state.provincesSelected.includes(province)){
//         this.setState({provincesSelected: this.state.provincesSelected.filter((x) => {return x !== province})});
//       } else{
//         this.setState({provincesSelected: this.state.provincesSelected.concat(province)});
//       }
//     }
    
//     changeSlider(value){

//       this.setState({maxDay: value});

//     }


//     handleSlider(props){
//       const { value, dragging, index, ...restProps } = props;

//       return (
//         <Tooltip
//           prefixCls="rc-slider-tooltip"
//           overlay={value}
//           visible={dragging}
//           placement="top"
//           key={index}
//         >
//           <Handle value={value} {...restProps} />
//         </Tooltip>
//       );
//     };

//     render() {
//         const covid = this.state.covid;

//         if(covid.length === 0){
//           return null;
//         }

//         let days = [];
//         for(let day in covid['totals']){
//            days.push(day);
//         }

//         const totalDays = days.length;

//         let data = {};
//         for(let prov in covid['data']){
//           data[prov] = [];
//         }

//         for(let prov in covid['data']){
//           for(let day in covid['data'][prov]){
//             data[prov].push(covid['data'][prov][day]['total_cases']);
//           }
//         }

//         let provinces = [];
//         for(let i in covid['provinces']){
//           let province = covid['provinces'][i];
//           provinces.push(<Button key={province} onClick={() => this.selectProvince(province)} >{province}</Button>);
//         }

//         let dataToShow = {};
//         for(let prov in data){
//           if(this.state.provincesSelected.includes(prov)){
//             dataToShow[prov] = data[prov].slice(0, this.state.maxDay);
//           }
//         }
        
//         // labels = labels.slice(0, this.state.maxDay);
//         console.log(covid['totals'], covid['totals'][days[days.length - 1]])
//         console.log(provinces)
//         return (
//             <Container >
//             <header>
//                 <Summary lastDay={covid['totals'][days[days.length - 1]]} day={days[days.length - 1]} />
//             </header>
//                 <h1>Confirmados por dia</h1>
//                 {provinces}
//                 <div>
//                 <br />
//                   Dias
//                   <Slider min={1} max={totalDays} defaultValue={totalDays-1} handle={this.handleSlider} onChange={(val) => this.changeSlider(val)} />
//                 </div>
//                 <LineGraph
//                     data={dataToShow}
//                     labels={days} />            
//             </Container>
//         )
//     }
// }

// ========================================

ReactDOM.render(

  <Dashboard />,
  document.getElementById('root')
);

