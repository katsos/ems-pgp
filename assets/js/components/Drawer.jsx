import React from 'react';
import Link from 'react-router-dom/Link';

import SignOut from "./SignOut";

const NAV_LINKS = {
  Home: '/',
  Students: '/students',
};

export default class Drawer extends React.Component {

  render() {

    const navLinks = Object.keys(NAV_LINKS).map((name, id) => {
     return (
       <Link
         className="mdl-navigation__link"
         to={NAV_LINKS[name]}
         key={id}
         onClick={this.props.toggleDrawer}
       >{name}</Link>
     )
    });

    return (
      <div className="mdl-layout__drawer">
        <nav className="mdl-navigation">
          {navLinks}
          <SignOut className="mdl-navigation__link" text="Logout"/>
        </nav>
      </div>
    )
  }
}
