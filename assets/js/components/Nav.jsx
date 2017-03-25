import React from 'react';
import Link from 'react-router-dom/Link';

const links = {
  Home: '/',
  Students: '/students',
};

export default function Nav(props) {
  const navList = Object.keys(links).map((name, id) => {
    return <NavLink to={links[name]} key={id} text={name}/>
  });

  return <nav className="mdl-navigation">{navList}</nav>
}

function NavLink(props) {
  return <Link to={props.to} className="mdl-navigation__link">{props.text}</Link>
}
