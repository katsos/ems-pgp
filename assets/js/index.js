import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './utils';

import LoginPage from './components/pages/LoginPage';
import LayoutPage from "./components/pages/layout/LayoutPage";

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
      <Route component={LayoutPage}/>
    </Switch>
  </Router>
, appElement);
