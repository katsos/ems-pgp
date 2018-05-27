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
    const { isLoading, error, program } = this.state;
    if (isLoading) return <LoadingAnimation/>;
    if (program === null) return <h3>Couldn't retrieve program!</h3>;
    if (error) return <h3>{error}</h3>;

    const { title, year, num_of_students: numOfStudents, total_pending_amount } = program;
    return (
      <div className="program">
        <h2 className="program__title">{title}</h2> <span>{year}</span>
        <button className="mdl-button mdl-js-button mdl-button--primary program__edit" onClick={this._editProgram}>
          <i className="material-icons">mode_edit</i> Edit Program
        </button>
        <div className="program__infos">
          <Link to={`${this.props.match.url}/students`}>{numOfStudents} students enrolled</Link>
          <table>
            <tbody>
            <tr><td>Total amount pending:</td><td>{total_pending_amount}</td></tr>
            {/*<tr><td>Total amount pending this semester:</td><td>{semester_pending_amount}</td></tr>*/}
            </tbody>
          </table>
        </div>
        {/* TODO: add income list */}
        {/* TODO: add outcome list */}
      </div>
    );
  }
}

export default ProgramPage;
