import React from 'react';

export default class ProgramPage extends React.Component {
  constructor(props) {
    super(props);

    this.programId = props.match.params.id;
  }

  render() {
    return (
      <div className="program">
        Program {this.programId}
      </div>
    )
  }
}
