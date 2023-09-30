import { Card, Container, Row, Col } from 'react-bootstrap';
import React from 'react';
import { Link } from 'react-router-dom'

function Cars({carData}) {

  return (
      <Container>
      <Row>
        {carData.map((item, index) => (
          <Col key={index} xs={12} md={4}>
            <Link to={`/car/${item.carMaker}`}>
            <Card>
              <Card.Img variant="top" src={item.image} />
              <Card.Body>
                <Card.Title>{item.partName}</Card.Title>
                <Card.Title>{item.carMaker}</Card.Title>
                <Card.Text>{`${item.price} ${'-'} ${item.carYear}`}</Card.Text>
              </Card.Body>
            </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Cars;