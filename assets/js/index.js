import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';

/* Import Material Design Lite */
import 'material-design-lite/dist/material.indigo-red.min.css';
import 'material-design-lite';
/* Import custom styles */
import '../scss/styles.scss';

const appElement = document.getElementById('react-app');

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/login" component={LoginPage}/>
      <Route component={Layout}/>
    </Switch>
  </Router>
, appElement);
