import React from 'react';

import Http from '../Http';

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
        const email = googleUser.getBasicProfile().getEmail();
        const token = googleUser.getAuthResponse().id_token;

        Http.post('/auth/login', {email, token})
          .then(response => response.json())
          .then(json => {
            console.log(json.user);
            console.log('User has been authenticated successfully!');

            // store user data to sessionStorage

            /* redirect user to "index" page */
            // location.href = location.origin;
          })
          .catch(response => {
            alert('There was an error while your authentication. ' +
              'Ask your IT department to verify that you are using the correct email.');
          });
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
