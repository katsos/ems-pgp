import React from 'react';
import Link from 'react-router-dom/Link';
import ROUTES from '../../../routes';

export default function Drawer(props) {
  return (
    <div className="mdl-layout__drawer">
      <nav className="mdl-navigation">
        {NavLinks(props.toggleDrawer)}
      </nav>
    </div>
  );
}

function NavLinks(toggleDrawer) {
  return ROUTES.map(({ name, url }) => {
     return (
       <Link
         className="mdl-navigation__link"
         to={url}
         key={name}
         onClick={toggleDrawer}
       >{name}</Link>
     );
  });
}
