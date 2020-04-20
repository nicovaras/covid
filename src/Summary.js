import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'react-bootstrap';

class Summary extends React.Component {

  render() {

    const lastDay = this.props.lastDay;

    return (
      <Container className="header-container" > 
        <Row className="justify-content-lg-center">
        <Col lg='6'></Col>
          <Col lg="auto" className='header-part'>
            <div>
              <span className='header-title'>Casos </span>  
              <span className='header-number'> {lastDay['total_cases']} </span>
              <span className='header-diff'> (+{lastDay['new_cases']}) </span>  
            </div> 
            
          </Col>
        
          <Col lg="auto" className='header-part'>
            <div> 
              <span className='header-title'>Muertes </span> 
              <span className='header-number'> {lastDay['total_deaths']} </span>
              <span className='header-diff'> (+{lastDay['new_deaths']}) </span>
            </div> 
          </Col>
          <Col lg="auto">
             <div className='header-updated'>
              Actualizado {this.props.day} 
             </div>
             </Col>
         </Row>

      </Container>
    );
  }

}

export default Summary;