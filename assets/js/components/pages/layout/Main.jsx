import {Route, Switch} from 'react-router-dom';

import Dashboard from '../../Dashboard';
import ProgramsRouter from "../programs/ProgramsRouter";

export default function Main() {
  return (
    <main className="mdl-layout__content layout__content">
      <Switch>
        <Route path="/programs" component={ProgramsRouter}/>
        <Route component={Dashboard}/>
      </Switch>
    </main>
  )
}
