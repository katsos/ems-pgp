import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Index from './Index';
import StudentPage from './StudentPage';
import New from './New';

const ROUTER_PREFIX = '/students';

function Router() {
  return (
    <Switch>
      <Route path={`${ROUTER_PREFIX}/new`} component={New}/>
      <Route exact path={`${ROUTER_PREFIX}/:id`} component={StudentPage}/>
      <Route component={Index}/>
    </Switch>
  )
}

export default Router;
