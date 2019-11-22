
import React from 'react';
import ReactDOM from 'react-dom';
import { ReactTableDefaults } from 'react-table';
import { BrowserRouter } from 'react-router-dom';
import Index from './pages';
import { AuthProvider } from './context/Auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-table/react-table.css';

Object.assign(ReactTableDefaults, {
  filterable: true,
  defaultPageSize: 5,
  previousText: 'Anterior',
  nextText: 'Siguiente',
  loadingText: 'Cargando...',
  noDataText: 'No se encontraron datos',
  pageText: 'Pagina',
  ofText: 'de',
  rowsText: 'datos',
});

ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <Index />
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById('root'),
);
