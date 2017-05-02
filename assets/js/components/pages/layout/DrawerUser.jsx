import React from 'react'

import SignOut from "../../SignOut";

export default class DrawerUser extends React.Component {
  render() {
    return (
      <div className="drawer-user">
        <img className="drawer-user__photo" src={window.user.picture}/>
        <span className="drawer-user__email mdl-color-text--grey-600">{window.user.email}</span>
        <button className="drawer-user__logout mdl-button mdl-js-button mdl-button--raised">
          <SignOut text="Logout"/>
        </button>
      </div>
    )
  }
}
