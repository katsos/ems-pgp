import React from 'react';
import Route from 'react-router-dom/Route';

import Dashboard from './Dashboard';
import Programs from "./programs/index";

export default class Main extends React.Component {
  render() {
    return (
      <main className="mdl-layout__content layout__content">
        <Route exact path="/" component={Dashboard}/>
              <Route path="/programs" component={Programs}/>
      </main>
    )
  }
}
