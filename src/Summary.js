import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'react-bootstrap';

class Summary extends React.Component {

  render() {

    const lastDay = this.props.lastDay;

    return (
      <Container className="header-container" > 
        <Row className="justify-content-lg-center">
          <Col lg="3" className='header-part'>
            <div className='header-title'> Confirmados </div> 
            <div className='header-number'> {lastDay['total_cases']} 
              <span className='header-diff'> (+ {lastDay['new_cases']}) </span>
            </div> 
          </Col>
        
          <Col lg="auto" className='header-part'>
            <div className='header-title'> Muertes </div> 
            <div className='header-number'> {lastDay['total_deaths']} 
              <span className='header-diff'> (+ {lastDay['new_deaths']}) </span>
            </div> 
          </Col>
         <div>Actualizado al: {this.props.day} </div>
         </Row>
      </Container>
    );
  }

}

export default Summary;