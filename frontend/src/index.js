import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Routes from './Routes';
import "bootstrap/dist/css/bootstrap.min.css";
import './styles.css';


ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);
