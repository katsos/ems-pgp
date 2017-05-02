import React from 'react';
import {Route, Switch} from 'react-router-dom';

import ProgramsIndex from "./ProgramsIndex";
import ProgramsList from "./ProgramsList";

export const ROUTER_PREFIX = '/programs';

export default function ProgramsRouter(props) {
  return (
    <Switch>
      <Route exact path={`${ROUTER_PREFIX}/active`} component={ProgramsList}/>
      <Route component={ProgramsIndex}/>
    </Switch>
  )
}
