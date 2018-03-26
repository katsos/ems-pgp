import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Index from './Index';
import New from './New';

function Router() {
  return (
    <Switch>
      <Route path='/students/new' component={New}/>
      <Route component={Index}/>
    </Switch>
  )
}

export default Router;
