import React from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router-dom/Link';
import ROUTES from '../../../routes';

function Drawer({ toggleDrawer }) {
  return (
    <div className='mdl-layout__drawer'>
      <nav className='mdl-navigation'>
        {ROUTES.map(({ name, label, url }) => (
          <Link
            className='mdl-navigation__link'
            to={url}
            key={name}
            onClick={toggleDrawer}
          >
            {label}
          </Link>
         ))}
          <a className='mdl-navigation__link' href='/logout'>
             ΑΠΟΣΥΝΔΕΣΗ
          </a>
      </nav>
    </div>
  );
}

Drawer.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
};

export default Drawer;
