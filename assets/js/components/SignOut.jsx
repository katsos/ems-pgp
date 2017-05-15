import React from 'react';
import Redirect from 'react-router-dom/Redirect';

import Http from "../Http";

export default class SignOut extends React.Component {
  constructor(props) {
    super(props);

    this.state = {isUserLoggedIn: true};
    this.className = (props.classes) ? props.classes.join(' ') : '';
    this._logoutUser = this._logoutUser.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    gapi.auth2.getAuthInstance().signOut()
      .then(this._logoutUser);
  }

  _logoutUser() {
    Http.post('/auth/logout')
      .then(response => this.setState({isUserLoggedIn: false}));
  }

  render() {
    if (!this.state.isUserLoggedIn) return <Redirect to="/login"/>;

    const className = this.props.className + ' clickable';
    return <a className={className} onClick={this.handleClick}>{this.props.text}</a>;
  }
}
