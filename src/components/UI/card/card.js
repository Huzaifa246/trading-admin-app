import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
// import './card.css';
import { SendIcon as Send, BagIcon as Bag, TogglesIcon as Toggles } from '@fortawesome/react-fontawesome';
const CardUi = () => {
  return (
    <>
<Container fluid="md">
        <Row>
          <Col sm={4} md={4}>
            <span>
              <h5>Send</h5>
            </span>
            <a href="#">
              {/* <Send /> Link */}
            </a>
          </Col>
          <Col sm={4} md={4}>
            <span>
              <h5>Recieve</h5>
            </span>
            <a href="#">
              {/* <Bag /> Link */}
            </a>
          </Col>
          <Col sm={4} md={4}>
            <span>
              <h5>Toggle</h5>
            </span>
            <a href="#">
              {/* <Toggles /> Link */}
            </a>
          </Col>
        </Row>
      </Container>
      <Container>
      <Row>
        <Col>1 of 2</Col>
        <Col>2 of 2</Col>
      </Row>
      </Container>
    </>
  );
};
export default CardUi;