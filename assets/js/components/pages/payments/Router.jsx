import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NewPayment from './NewPayment';
import List from './List';

const ROUTER_PREFIX = '/payments';

function Router() {
  return (
    <Switch>
      <Route exact path={`${ROUTER_PREFIX}/new`} component={NewPayment} />
      <Route component={List} />
    </Switch>
  );
}

export default Router;
