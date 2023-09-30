import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './login';
import Cars from './cars';
import Car from './car';

const AppRouter = ({ carData }) => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cars" element={<Cars carData={carData} />} />
        <Route path="/car/:carMaker" element={<Car carData={carData} />} />
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;