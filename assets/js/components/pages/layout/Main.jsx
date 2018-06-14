import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ROUTES from '../../../routes';
import Dashboard from '../../Dashboard';

export default function Main() {
  return (
    <main className='mdl-layout__content layout__content'>
      <Switch>
        {ROUTES
          .filter(r => r.name !== 'home')
          .map(({ name, url, component }) => <Route key={name} path={url} component={component} />)
        }
        <Route component={Dashboard} />
      </Switch>
    </main>
  );
}
