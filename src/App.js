import React from 'react';
import AppRouter from './components/appRouter';
import { useState, useEffect } from 'react';
import { FormValuesProvider } from './components/formValuesContext';

function App() {

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
    <FormValuesProvider>
      <div className="App">
          <AppRouter carData={carData}/>
      </div>
    </FormValuesProvider>
  );
}

export default App;
