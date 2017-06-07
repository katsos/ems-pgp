import React from 'react';

import Http from '../../../Http';
import LoadingAnimation from "../../LoadingAnimation";

export default class ProgramPage extends React.Component {
  constructor(props) {
    super(props);

    this.program = {id: props.match.params.id};
  }

  componentWillMount() {
    this.setState({isLoading: true});

    Http.get(`/api/programs/${this.program.id}`)
      .then(response => response.json())
      .then(data => {
        this.program = data;
        this.setState({isLoading: false});
      })
      .catch(response => {
        alert(response);
      });
  }

  render() {
    if (this.state.isLoading) return <LoadingAnimation/>;

    return (
      <div className="program">
        Program {this.program.title}
      </div>
    )
  }
}
