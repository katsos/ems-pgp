import React from 'react';
import LogoutButton from "../../LogoutButton";

export default function DrawerUser(props) {
  const email = window.user.email;
  const imgUrl = window.user.google_user.image_url;

  return (
    <div className="drawer-user">
      <img className="drawer-user__photo" src={imgUrl}/>
      <span className="drawer-user__email mdl-color-text--grey-600">{email}</span>
      <button className="drawer-user__logout mdl-button mdl-js-button mdl-button--raised">
        <LogoutButton>Logout</LogoutButton>
      </button>
    </div>
  )
}
