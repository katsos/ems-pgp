import React from 'react';
import PropTypes from 'prop-types';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import Redirect from 'react-router-dom/Redirect';
import withRouter from 'react-router-dom/withRouter';
import ROUTES from '../../../routes';

const DEFAULT_URL = ROUTES.find(r => r.isDefault).url;

function Main(props) {
  if (props.location.pathname === '/') return <Redirect to={DEFAULT_URL} />;

  return (
    <main className='mdl-layout__content layout__content'>
      <Switch>
        {ROUTES.map(r => <Route key={r.name} path={r.url} component={r.component} />)}
      </Switch>
    </main>
  );
}

Main.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

const MainWithRouter = withRouter(Main);
export default MainWithRouter;
