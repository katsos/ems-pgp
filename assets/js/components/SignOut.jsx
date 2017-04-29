import React from 'react';
import Redirect from 'react-router-dom/Redirect';

export default class SignOut extends React.Component {
  constructor(props) {
    super(props);

    this.state = {isUserLoggedIn: true};
    this.className = (props.classes) ? props.classes.join(' ') : '';
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    gapi.auth2.getAuthInstance().signOut()
      .then(this._logoutUser());
  }

  _logoutUser() {
    sessionStorage.removeItem('user');
    this.setState({isUserLoggedIn: false});
  }

  render() {
    if (!this.state.isUserLoggedIn) return <Redirect to="/login"/>;

    const className = this.props.className + ' clickable';
    return <a className={className} onClick={this.handleClick}>{this.props.text}</a>;
  }
}
