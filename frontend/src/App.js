import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/Routes';  // Import the AppRoutes component

const App = () => {
  return (
    <Router>
      <AppRoutes />  {/* Use the AppRoutes component for all routing */}
    </Router>
  );
};

export default App;

