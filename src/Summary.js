import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'react-bootstrap';

class Summary extends React.Component {

  render() {

    const lastDay = this.props.lastDay;

    return (
      <Container class="header-container" > 
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
         <div>Actualizado al: {this.props.day} </div>
         </Row>
      </Container>
    );
  }

}

export default Summary;