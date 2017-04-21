import React from 'react';

export default class SignOut extends React.Component {
  constructor(props) {
    super(props);

    this.className = (props.classes) ? props.classes.join(' ') : '';

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    gapi.auth2.getAuthInstance().signOut()
      .then(() =>  location.pathname = '/login');
  }

  render() {
    return <a className={this.props.className} onClick={this.handleClick} href="#">{this.props.text}</a>
  }
}
