import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';



import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'react-bootstrap';

import Button from '@material-ui/core/Button';
import Dashboard from './Dashboard';






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

// ========================================

ReactDOM.render(

  <Dashboard />,
  document.getElementById('root')
);

