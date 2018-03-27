import React from 'react';
import Link from 'react-router-dom/Link';
import LoadingAnimation from "../../LoadingAnimation";
import Program from '../../../models/Program';

class ProgramPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      program: null,
      error: null,
    };
    // this._editProgram = this._editProgram.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    Program.get(id)
      .then(program => this.setState({ program }))
      .catch((httpResponse) => {
        const { response } = httpResponse;
        console.error(httpResponse);
        if (response.status === 404) {
          this.setState({ error: `Program with id ${id} not found!` })
        }
      })
      .finally(() => this.setState({ isLoading: false }));
  }

  // _editProgram() {
  //   throw Error('Not implemented yet!');
  // }

  render() {
    if (this.state.isLoading) return <LoadingAnimation/>;

    if (this.state.error) return <h3>{this.state.error}</h3>;

    const { title, year, num_of_students: numOfStudents } = this.state.program;
    return (
      <div className="program">
        <h2 className="program__title">{title}</h2> <span>{year}</span>
        <button className="mdl-button mdl-js-button mdl-button--primary program__edit" onClick={this._editProgram}>
          <i className="material-icons">mode_edit</i> Edit Program
        </button>
        <div className="program__infos">
          <Link to={`${this.props.match.url}/students`}>{numOfStudents} students enrolled</Link>
          <div>Temporary infos table placeholder</div>
        </div>
      </div>
    )
  }
}

export default ProgramPage;
