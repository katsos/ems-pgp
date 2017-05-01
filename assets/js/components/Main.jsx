import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Dashboard from './Dashboard';
import Program from "./Program";
import Programs from "./Programs";

export default class Main extends React.Component {
  render() {
    return (
      <main className="mdl-layout__content layout__content">
        <Switch>
          <Route exact path="/programs/" component={Programs}/>
                <Route path="/programs/:id" component={Program}/>
          <Route component={Dashboard}/>
        </Switch>
      </main>
    )
  }
}
