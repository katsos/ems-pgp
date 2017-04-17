import React from 'react';

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="mdl-color--grey-100 login-page">
        <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent sign-in">Sign In</button>
      </div>
    )
  }
}
