import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import moment from 'moment';

moment.locale('el');
import './utils'; // register not exported functions onto window
import LayoutPage from "./components/pages/layout/LayoutPage";

/* Import Material Design Lite */
import 'material-design-lite/dist/material.indigo-red.min.css';
import 'material-design-lite';
import 'react-select/dist/react-select.css';
import '../scss/styles.scss';

const appElement = document.getElementById('react-app');

ReactDOM.render(
  <Router>
    <Route component={LayoutPage}/>
  </Router>
, appElement);
