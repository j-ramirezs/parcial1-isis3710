import React, { createContext, useState } from 'react';

const FormValuesContext = createContext();

export const FormValuesProvider = ({ children }) => {
  const [formValues, setFormValues] = useState({
    email: '', 
    password: '',
    role: Math.random() < 0.5,
  });

  return (
    <FormValuesContext.Provider value={{ formValues, setFormValues }}>
      {children}
    </FormValuesContext.Provider>
  );
};

export default FormValuesContext;
