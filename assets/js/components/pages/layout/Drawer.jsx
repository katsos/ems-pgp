import React from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router-dom/Link';
import ROUTES from '../../../routes';

function Drawer({ toggleDrawer }) {
  return (
    <div className='mdl-layout__drawer'>
      <nav className='mdl-navigation'>
        {ROUTES.map(({ name, url }) => (
          <Link
            className='mdl-navigation__link'
            to={url}
            key={name}
            onClick={toggleDrawer}
          >
            {name}
          </Link>
         ))}
      </nav>
    </div>
  );
}

Drawer.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
};

export default Drawer;
