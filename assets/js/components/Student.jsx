import React from 'react';

export default class Student extends React.Component {
  render() {
    return(
      <div>{this.props.match.params.id}</div>
    )
  }
}
