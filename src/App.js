import React from 'react';
import AppRouter from './components/appRouter';
import { useState, useEffect } from 'react';
import { FormValuesProvider } from './components/formValuesContext';
import { IntlProvider } from "react-intl";

import enMessages from './locales/en.json';
import esMessages from './locales/es.json';

function App() {

  const detectBrowserLanguage = () => {
    const userLanguage = navigator.language || navigator.userLanguage;
    return userLanguage;
  };

  const userLanguage = detectBrowserLanguage();

  const translations = {
    en: enMessages,
    es: esMessages,
  };


  const [carData, setCarData] = useState([]);

  const githubJsonUrl = 'https://raw.githubusercontent.com/j-ramirezs/parcial1-isis3710/main/datos.json';
  
  useEffect(() => {
    fetch(githubJsonUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setCarData(data);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, []);

  return (
    <IntlProvider locale={userLanguage} messages={translations[userLanguage]}>
      <FormValuesProvider>
        <div className="App">
            <AppRouter carData={carData}/>
        </div>
      </FormValuesProvider>
    </IntlProvider>
    
  );
}

export default App;
