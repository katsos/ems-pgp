import React from 'react';
import {Route, Switch} from 'react-router-dom';

import ProgramsIndex from "./ProgramsIndex";
import ProgramsList from "./ProgramsList";
import ProgramPage from "./ProgramPage";
import ProgramNew from "./ProgramNew";

export const ROUTER_PREFIX = '/programs';

export default function ProgramsRouter() {
  return (
    <Switch>
      <Route path={`${ROUTER_PREFIX}/new`} component={ProgramNew}/>
      <Route path={`${ROUTER_PREFIX}/active`} component={ProgramsList}/>
      <Route path={`${ROUTER_PREFIX}/:id`} component={ProgramPage}/>
      <Route component={ProgramsIndex}/>
    </Switch>
  )
}
