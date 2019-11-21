
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Index from './pages';
import { AuthProvider } from './context/Auth';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <Index />
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById('root'),
);
