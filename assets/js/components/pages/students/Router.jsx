import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Index from './Index';

function Router() {
  return (
    <Switch>
      <Route component={Index}/>
    </Switch>
  )
}

export default Router;
