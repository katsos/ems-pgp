import React from 'react';

import Header from './Header';
import Drawer from './Drawer';
import Main from './Main';

export default class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.isUserLoggedIn = sessionStorage.googleAuth;
    if (!this.isUserLoggedIn) location.href = '/login';
  }

  componentDidMount() {
    /* Initialize google auth2 */
    gapi.load('auth2', () => gapi.auth2.init());
  }

  render() {

    if (!this.isUserLoggedIn) return null;
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <Header/>
        <Drawer/>
        <Main/>
      </div>
    )
  }
}
