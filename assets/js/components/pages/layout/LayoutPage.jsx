import React from 'react';
import { findDOMNode } from 'react-dom';

import Http from '../../../Http';
import Header from './Header';
import Drawer from './Drawer';
import Main   from './Main';
import LoadingAnimation from '../../LoadingAnimation';

export default class LayoutPage extends React.Component {
  constructor(props) {
    super(props);

    window.user = {};
    window.user['auth'] = JSON.parse(sessionStorage.getItem('user_auth'));

    this.state = {
      isUserLoggedIn: (!!window.user.auth),
      isUserLoaded: false,
      isGoogleAuthInitialized: false
    };

    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  componentWillMount() {
    if (!this.state.isUserLoggedIn) return location.pathname = 'login';

    Http.get(`/api/users?email=${window.user.auth.email}`)
      .then(response => response.json())
      .then(data => {
        Object.assign(window.user, data);
        this.setState({isUserLoaded: true});
      })
      .catch(response => console.error(response));
  }

  componentDidMount() {
    this._initializeGoogleAuth();
  }

  _initializeGoogleAuth() {
    gapi.load('auth2', () => {
      gapi.auth2.init();
      this.setState({isGoogleAuthInitialized: true})
    });
  }

  toggleDrawer() {
    this.layoutNodeElement = findDOMNode(this);
    this.layoutNodeElement.MaterialLayout.toggleDrawer();
  }

  render() {
    if (!this.state.isUserLoaded || !this.state.isGoogleAuthInitialized) return <LoadingAnimation/>;

    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header layout">
        <Header/>
        <Drawer toggleDrawer={this.toggleDrawer}/>
        <Main/>
      </div>
    )
  }
}
