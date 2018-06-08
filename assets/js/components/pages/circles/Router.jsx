import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CircleList from './List';

export const ROUTER_PREFIX = '/circles';

export default function Router() {
  return (
    <Switch>
      {/*<Route path={`${ROUTER_PREFIX}/new`} component={NewCircleForm}/>*/}
      {/*<Route exact path={`${ROUTER_PREFIX}/:id`} component={CirclePage}/>*/}
      <Route component={CircleList}/>
    </Switch>
  );
}
