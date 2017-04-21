import React from 'react';
import findDOMNode from 'react-dom/lib/findDOMNode'

import Header from './Header';
import Drawer from './Drawer';
import Main from './Main';

export default class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.isUserLoggedIn = sessionStorage.googleAuth;
    if (!this.isUserLoggedIn) location.href = '/login';

    this.toggleDrawer = this.toggleDrawer.bind(this);
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
    if (!this.isUserLoggedIn) return null;

    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <Header/>
        <Drawer toggleDrawer={this.toggleDrawer}/>
        <Main/>
      </div>
    )
  }
}
