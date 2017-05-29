import React from 'react';
import findDOMNode from 'react-dom/lib/findDOMNode';

import Http from '../../../Http';
import Header from './Header';
import Drawer from './Drawer';
import Main   from './Main';
import LoadingAnimation from "../../LoadingAnimation";

export default class LayoutPage extends React.Component {
  constructor(props) {
    super(props);

    window.user = {
      auth: JSON.parse(sessionStorage.getItem('user_auth'))
    };
    this.state = {isUserLoggedIn: (!!window.user.auth)};

    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  componentWillMount() {
    this.state.isUserLoaded = false;
    if (!window.user.auth) return;

    Http.get(`/api/users?email=${window.user.auth.email}`)
      .then(response => {
        // debugger;
      })
      .catch(response => {
        // debugger;
      });
  }

  componentDidMount() {
    this._initializeGoogleAuth();
  }

  _initializeGoogleAuth() {
    gapi.load('auth2', () => gapi.auth2.init());
  }

  toggleDrawer() {
    this.layoutNodeElement = findDOMNode(this);
    this.layoutNodeElement.MaterialLayout.toggleDrawer();
  }

  render() {
    if (!this.state.isUserLoggedIn) return location.pathname = 'login';
    if (!this.state.isUserLoaded) return <LoadingAnimation/>;

    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header layout">
        <Header/>
        <Drawer toggleDrawer={this.toggleDrawer}/>
        <Main/>
      </div>
    )
  }
}
