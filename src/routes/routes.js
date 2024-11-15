import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import DashboardPage from '../components/Dashboard/DashboardPage';
import RegisterPage from '../components/Register/RegisterPage';
import LoginPage from '../components/Login/LoginPage';
import BusinessProfilePage from '../components/BusinessProfile/BusinessProfilePage';

const RoutesComponent = ({ isAuthenticated, login, logout }) => {
  return (
    <Routes>
      {/* Protected Route for Dashboard */}
      <Route 
        path="/" 
        element={isAuthenticated ? <DashboardPage logout={logout} /> : <Navigate to="/login" />} 
      />
        
      {/* Login Route */}
      <Route 
        path="/login" 
        element={<LoginPage login={login} />} 
      />
        
      {/* Register Route */}
      <Route 
        path="/register" 
        element={<RegisterPage />} 
      />
        
      {/* Business Profile Route */}
      <Route 
        path="/onboarding" 
        element={<BusinessProfilePage login={login} />} 
      />
    </Routes>
  );
};

export default RoutesComponent;
