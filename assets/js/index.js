import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';

/* register not exported functions onto window */
import './utils';

import LayoutPage from "./components/pages/layout/LayoutPage";

/* Import Material Design Lite */
import 'material-design-lite/dist/material.indigo-red.min.css';
import 'material-design-lite';
/* Import custom styles */
import '../scss/styles.scss';

const appElement = document.getElementById('react-app');

ReactDOM.render(
  <Router>
    <Route component={LayoutPage}/>
  </Router>
, appElement);
