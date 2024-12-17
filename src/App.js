import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RoutesComponent from './routes/routes';  // Import the RoutesComponent
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simulate login
  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      {/* Pass authentication state and functions to RoutesComponent */}
      <RoutesComponent 
        isAuthenticated={isAuthenticated} 
        login={login} 
        logout={logout} 
      />
    </Router>
  );
}

export default App;
