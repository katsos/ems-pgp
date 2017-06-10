import React from 'react';

export default function LogoutButton(props) {
  return <a onClick={logoutUser}>{props.children}</a>;
}

function logoutUser() {
  sessionStorage.removeItem('user_auth');
  location.pathname = 'logout';
}
