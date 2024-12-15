import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Item from '../pages/Item';
import Report from '../pages/Report';
import Supplier from '../pages/Supplier';
import BusinessProfile from '../pages/BusinessProfile'; // Correct import

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/onboarding" element={<BusinessProfile />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/item" element={<Item />} />
      <Route path="/report" element={<Report />} />
      <Route path="/supplier" element={<Supplier />} />
    </Routes>
  );
};

export default AppRoutes;
