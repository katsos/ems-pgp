import React from 'react'

import SignOut from "./SignOut";

export default class DrawerUser extends React.Component {

  constructor(props) {
    super(props);

    this.googleUser = JSON.parse(sessionStorage.getItem('googleProfile'));
  }

  render() {
    return (
      <div className="drawer-user">
        <img className="drawer-user__photo" src={this.googleUser.imgUrl}/>
        <span className="drawer-user__email mdl-color-text--grey-600">{this.googleUser.email}</span>
        <button className="drawer-user__logout mdl-button mdl-js-button mdl-button--raised">
          <SignOut text="Logout"/>
        </button>
      </div>
    )
  }
}
