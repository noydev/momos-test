import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/app';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/auth/Provider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
