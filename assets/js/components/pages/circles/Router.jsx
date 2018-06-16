import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NewCircleForm from './New';
import BudgetPage from './Budget';
import { StudentsList } from '../students';
import CircleList from './CircleList';
import CirclePage from './CirclePage';
import StudentsListEdit from './StudentsListEdit';

export const ROUTER_PREFIX = '/circles';

export default function Router() {
  return (
    <Switch>
      <Route path={`${ROUTER_PREFIX}/new`} component={NewCircleForm} />
      <Route exact path={`${ROUTER_PREFIX}/:id`} component={CirclePage} />
            <Route path={`${ROUTER_PREFIX}/:id/budget`} component={BudgetPage} />
            <Route path={`${ROUTER_PREFIX}/:id/students`} component={StudentsList} />
            <Route path={`${ROUTER_PREFIX}/:id/new_students`} component={StudentsListEdit} />
      <Route component={CircleList} />
    </Switch>
  );
}
