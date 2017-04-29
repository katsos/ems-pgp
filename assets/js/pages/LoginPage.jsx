import React from 'react';
import Redirect from 'react-router-dom/Redirect';

import Http from '../Http';

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    const sessionStorageUser = sessionStorage.getItem('user');
    this.state = {isUserLoggedIn: (!!sessionStorageUser)};
    this.redirectTo = '/';
    this.buttonCssId = 'google-sign-in';
  }

  componentDidMount() {
    this._renderSignInButton();
  }

  _renderSignInButton() {
    const self = this;

    gapi.signin2.render(this.buttonCssId, {
      scope: 'email',
      width: 260,
      height: 55,
      longtitle: true,
      onsuccess(googleUser) {
        const email = googleUser.getBasicProfile().getEmail();
        const token = googleUser.getAuthResponse().id_token;
        self._sendAuthTokenToServer(email, token);
      },
      onfailure(response) {
        console.error(response);
        const errorHumanized = response.error.split('_').join(' ').capitalize();
        alert(errorHumanized);
      }
    });
  }

  _sendAuthTokenToServer(email, token) {
    Http.post('/auth/login', {email, token})
      .then(response => response.json())
      .then(json => {
        sessionStorage.setItem('user', JSON.stringify(json.user));

        /* setting state is the write way to redirect to index, but <Drawer/> doesn't render itself this way */
        // this.setState({isUserLoggedIn: true});
        location.pathname = '/'; // TODO: do this using setState(), remove this line
      })
      .catch(response => {
        alert('There was an error while your authentication. ' +
          'Ask your IT department to verify that you are using the correct email.');
      });
  }

  render() {
    // if (this.state.isUserLoggedIn) return <Redirect to={this.redirectTo}/>;

    return (
      <div className="mdl-color--grey-100 login-page">
        <div id={this.buttonCssId}/>
      </div>
    )
  }
}
