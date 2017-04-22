import React from 'react';
import Link from 'react-router-dom/Link';

import DrawerUser from "./DrawerUser";

const NAV_LINKS = {
  Home: '/',
  Students: '/students',
};

export default function Drawer(props) {
  return (
    <div className="mdl-layout__drawer">
      <DrawerUser/>
      <nav className="mdl-navigation">
        {NavLinks(props.toggleDrawer)}
      </nav>
    </div>
  );
}

function NavLinks(toggleDrawer) {
  return Object.keys(NAV_LINKS).map((name, id) => {
     return (
       <Link
         className="mdl-navigation__link"
         to={NAV_LINKS[name]}
         key={id}
         onClick={toggleDrawer}
       >{name}</Link>
     )
  });
}
