import React from "react";
import { useContext } from "react";
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, Table } from 'react-bootstrap';
import FormValuesContext from './formValuesContext'
import { FormattedMessage } from "react-intl";
import './car.css';

const Car = ({ carData }) => {

  const { formValues } = useContext(FormValuesContext);
  const role = formValues.role;

  const { carMaker } = useParams();
  const car = carData.find((item) => item.carMaker === carMaker);

  if (!car) {
    return <div><FormattedMessage id="CarNotFoundText"/></div>;
  }

    return (
      <Container>
      <Row>
        <Col xs={12} md={6}>
          <div className="image-container">
            <Image src={car.image} />
          </div>
        </Col>
        <Col xs={12} md={6}>
          <h3>{car.partName}</h3>
          <Table borderless className="custom-table">
            <tbody>
              <tr>
                <td><FormattedMessage id="CarMakerText"/></td>
                <td>{role? <input type="text" defaultValue={car.carMaker} /> : <p>{car.carMaker}</p>}</td>
              </tr>
              <tr>
                <td><FormattedMessage id="CarModelText"/></td>
                <td>{role? <input type="text" defaultValue={car.carModel} /> : <p>{car.carModel}</p>}</td>
              </tr>
              <tr>
                <td><FormattedMessage id="CarYearText"/></td>
                <td>{role? <input type="number" defaultValue={car.carYear} /> : <p>{car.carYear}</p>}</td>
              </tr>
              <tr>
                <td><FormattedMessage id="AvailableText"/></td>
                <td>{role? <input type="text" defaultValue={car.available ? 'Yes' : 'No'} /> : <p>{car.available ? 'Yes' : 'No'}</p>}</td>
              </tr>
              <tr>
                <td><FormattedMessage id="PriceText"/></td>
                <td>{role? <input type="text" defaultValue={car.price} /> : <p>{car.price}</p>}</td>
              </tr>
            </tbody>
          </Table>
          <p className="description-text"><FormattedMessage id="DescriptionText"/></p>
          <p>{car.description}</p>
        </Col>
      </Row>
    </Container>
    );
};

export default Car