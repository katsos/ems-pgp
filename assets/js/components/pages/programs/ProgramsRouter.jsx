import React from 'react';
import {Route, Switch} from 'react-router-dom';

import ProgramsIndex from "./ProgramsIndex";
import ProgramsList from "./ProgramsList";
import ProgramPage from "./ProgramPage";
import ProgramNew from "./ProgramNew";
import NewExpense from './NewExpense';
import ProgramStudents from "./ProgramStudents";
import StudentsNew from '../students/New';

export const ROUTER_PREFIX = '/programs';

export default function ProgramsRouter() {
  return (
    <Switch>
      <Route path={`${ROUTER_PREFIX}/new`} component={ProgramNew}/>
      <Route path={`${ROUTER_PREFIX}/active`} component={ProgramsList}/>
      <Route path={`${ROUTER_PREFIX}/finished`} component={ProgramsList}/>
      <Route exact path={`${ROUTER_PREFIX}/:id`} component={ProgramPage}/>
      <Route exact path={`${ROUTER_PREFIX}/:id/new_expense`} component={NewExpense}/>
      <Route exact path={`${ROUTER_PREFIX}/:programId/students`} component={ProgramStudents}/>
            <Route path={`${ROUTER_PREFIX}/:programId/students/new`} component={StudentsNew}/>
      <Route component={ProgramsIndex}/>
    </Switch>
  );
}
