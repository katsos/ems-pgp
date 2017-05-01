import React from 'react';
import Route from 'react-router-dom/Route';

import Dashboard from './Dashboard';
import Programs from "./Programs";

export default class Main extends React.Component {
  render() {
    return (
      <main className="mdl-layout__content layout__content">
        <Route exact path="/" component={Dashboard}/>
        <Route exact path="/programs" component={Programs}/>
              <Route path="/programs/:id" component={Programs}/>
      </main>
    )
  }
}
