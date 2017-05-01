import React from 'react';

export default class Program extends React.Component {
  constructor(props) {
    super(props);

    this.programId = props.match.params.id;
  }

  render() {

    return (
      <div className="programs">
        Program {this.programId}
      </div>
    )
  }
}
