import React from 'react';
import Link from 'react-router-dom/Link';

import Http from '../../../Http';
import LoadingAnimation from "../../LoadingAnimation";

export default class ProgramPage extends React.Component {
  constructor(props) {
    super(props);

    this.program = {id: props.match.params.id};
    this._editProgram = this._editProgram.bind(this);
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

  _editProgram() {
    throw Error('Not implemented yet!');
  }

  render() {
    if (this.state.isLoading) return <LoadingAnimation/>;

    return (
      <div className="program">
        <h2 className="program__title">{this.program.title}</h2> <span>{this.program.year}</span>
        <button className="mdl-button mdl-js-button mdl-button--primary program__edit" onClick={this._editProgram}>
          <i className="material-icons">mode_edit</i> Edit Program
        </button>
        <div className="program__infos">
          <Link to={`${this.props.match.url}/students`} students={this.program.students}>{this.program.students.length} students enrolled</Link>
          <div>Temporary infos table placeholder</div>
        </div>
      </div>
    )
  }
}
