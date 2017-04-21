import React from 'react';

import Header from './Header';
import Drawer from './Drawer';
import Main from './Main';

export default class Layout extends React.Component {

  componentDidMount() {
    /* Initialize auth2 of google api*/
    gapi.load('auth2', () => gapi.auth2.init());
  }

  render() {
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <Header/>
        <Drawer/>
        <Main/>
      </div>
    )
  }
}
