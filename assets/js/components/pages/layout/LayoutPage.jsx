import React from 'react';
import { findDOMNode } from 'react-dom';

import Header from './Header';
import Drawer from './Drawer';
import Main   from './Main';

export default class LayoutPage extends React.Component {
  constructor(props) {
    super(props);
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer() {
    this.layoutNodeElement = findDOMNode(this);
    this.layoutNodeElement.MaterialLayout.toggleDrawer();
  }

  render() {
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header layout">
        <Header/>
        <Drawer toggleDrawer={this.toggleDrawer}/>
        <Main/>
      </div>
    )
  }
}
