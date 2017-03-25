import React from 'react';
import Route from 'react-router-dom/Route';

import Dashboard from './Dashboard';
import Student from './Student';
import Students from './students/index';
import StudentsNew from './students/new';

export default class Main extends React.Component {
  render() {
    return (
      <main className="mdl-layout__content">
        <Route exact path="/" component={Dashboard}/>
              <Route path="/student/:id" component={Student}/>
        <Route exact path="/students" component={Students}/>
              <Route path="/students/new" component={StudentsNew}/>
      </main>
    )
  }
}
