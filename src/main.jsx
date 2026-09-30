import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { GymProvider } from './context/GymContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GymProvider>
      <App />
    </GymProvider>
  </React.StrictMode>
);