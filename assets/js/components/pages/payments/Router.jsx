import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Index from './Index';

const ROUTER_PREFIX = '/payments';

function Router() {
  return (
    <Switch>
      {/*<Route exact path={`${ROUTER_PREFIX}/new`} component={New}/>*/}
      {/*<Route exact path={`${ROUTER_PREFIX}/:id`} component={PaymentPage}/>*/}
      <Route component={Index}/>
    </Switch>
  );
}

export default Router;
