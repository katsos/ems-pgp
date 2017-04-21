import React from 'react';

export default class SignOut extends React.Component {
  constructor(props) {
    super(props);

    this.className = (props.classes) ? props.classes.join(' ') : '';

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    gapi.auth2.getAuthInstance().signOut()
      .then(() =>  {
        sessionStorage.removeItem('googleAuth');
        sessionStorage.removeItem('googleProfile');

        location.pathname = '/login'
      });
  }

  render() {
    const className = this.props.className + ' clickable';

    return <a className={className} onClick={this.handleClick}>{this.props.text}</a>
  }
}
