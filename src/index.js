import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IntlProvider } from "react-intl";

import enMessages from './locales/en.json';
import esMessages from './locales/es.json';

const detectBrowserLanguage = () => {
    const userLanguage = navigator.language || navigator.userLanguage;
    return userLanguage;
  };

const userLanguage = detectBrowserLanguage();

const translations = {
    en: enMessages,
    es: esMessages,
  };

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <IntlProvider locale={userLanguage} messages={translations[userLanguage]}>
  <React.StrictMode>
    <Container>
      <Row xs={1}>
        <Col>
          <App />
        </Col></Row>
    </Container>
  </React.StrictMode>
  </IntlProvider>
);