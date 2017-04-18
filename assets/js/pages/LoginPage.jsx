import React from 'react';

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.buttonCssId = 'google-sign-in';
  }

  componentDidMount() {
    this._renderSignInButton();
  }

  _renderSignInButton() {
    gapi.signin2.render(this.buttonCssId, {
      scope: 'email',
      width: 260,
      height: 55,
      longtitle: true,
      onsuccess(googleUser) {
        const googleProfile = googleUser.getBasicProfile();
        const googleAuth = googleUser.getAuthResponse();

        sessionStorage.setItem('googleProfile', JSON.stringify(googleProfile));
        sessionStorage.setItem('googleAuth', JSON.stringify(googleAuth));

        /* redirect user to "index" page */
        location.href = location.origin;
      },
      onfailure(response) {
        console.error(response);
        
        const error = response.error.split('_').join(' ').capitalize();
        alert(error);
      }
    });
  }

  render() {
    return (
      <div className="mdl-color--grey-100 login-page">
        <div id={this.buttonCssId}/>
      </div>
    )
  }
}
