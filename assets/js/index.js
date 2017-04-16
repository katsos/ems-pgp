import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';

/* Import Material Design Lite */
import 'material-design-lite/dist/material.indigo-red.min.css';
import 'material-design-lite';
/* Import custom styles */

import Layout from './components/Layout';
import '../scss/styles.scss';

const appElement = document.getElementById('react-app');

ReactDOM.render(
  <Router>
    <Layout/>
  </Router>
, appElement);
