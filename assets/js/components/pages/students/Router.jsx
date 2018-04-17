import React from 'react';
import {Route, Switch} from 'react-router-dom';
import New from './New';
import Edit from './Edit';
import Index from './Index';
import StudentPage from './StudentPage';

const ROUTER_PREFIX = '/students';

function Router() {
  return (
    <Switch>
      <Route exact path={`${ROUTER_PREFIX}/new`} component={New}/>
      <Route exact path={`${ROUTER_PREFIX}/:id`} component={StudentPage}/>
      <Route exact path={`${ROUTER_PREFIX}/:id/edit`} component={Edit}/>
      <Route component={Index}/>
    </Switch>
  );
}

export default Router;
