import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NewCircleForm from './New';
import CircleList from './List';
import CirclePage from './CirclePage';

export const ROUTER_PREFIX = '/circles';

export default function Router() {
  return (
    <Switch>
      <Route path={`${ROUTER_PREFIX}/new`} component={NewCircleForm}/>
      <Route exact path={`${ROUTER_PREFIX}/:id`} component={CirclePage}/>
      <Route component={CircleList}/>
    </Switch>
  );
}
