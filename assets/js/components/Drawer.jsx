import React from 'react';
import Nav from './Nav';

export default class Drawer extends React.Component {
  render() {
    return (
      <div className="mdl-layout__drawer">
        <Nav/>
      </div>
    )
  }
}
