import React from 'react';
import Redirect from 'react-router-dom/Redirect';
import findDOMNode from 'react-dom/lib/findDOMNode';

import Header from './Header';
import Drawer from './Drawer';
import Main from './Main';

export default class LayoutPage extends React.Component {
  constructor(props) {
    super(props);

    this.sessionStorageUser = sessionStorage.getItem('user');
    this.state = {isUserLoggedIn: (!!this.sessionStorageUser)};
    window.user = JSON.parse(this.sessionStorageUser);
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
    if (!this.state.isUserLoggedIn) return <Redirect to="/login"/>;

    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header layout">
        <Header/>
        <Drawer toggleDrawer={this.toggleDrawer}/>
        <Main/>
      </div>
    )
  }
}
