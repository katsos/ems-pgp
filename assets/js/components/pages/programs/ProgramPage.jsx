import React from 'react';
import Link from 'react-router-dom/Link';
import LoadingAnimation from "../../LoadingAnimation";
import Program from '../../../models/Program';
import './ProgramPage.scss';

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

    const { budget, title, year, expenses, num_of_students: numOfStudents, total_pending_amount } = program;
    return (
      <div className="Program">

        <div className="Program__header">
          <h2 className="program__title">{title}</h2> <span>{year}</span>
          <button className="mdl-button mdl-js-button mdl-button--primary program__edit" onClick={this._editProgram}>
            <i className="material-icons">mode_edit</i> Edit Program
          </button>
        </div>

        <div className="Program__infos">
          <Link to={`${this.props.match.url}/students`}>{numOfStudents} students enrolled</Link>
          <table>
            <tbody>
              <tr><td>Budget:</td><td>{budget}</td></tr>
              <tr><td>Total amount pending:</td><td>{total_pending_amount}</td></tr>
              {/*<tr><td>Total amount pending this semester:</td><td>{semester_pending_amount}</td></tr>*/}
            </tbody>
          </table>
        </div>
        {/* TODO: add income list */}
        {/*<div className='Program__income'>*/}
          {/*<h3>Income</h3>*/}
          {/*<table>*/}
            {/*<thead>*/}
              {/*<th>id</th>*/}
            {/*</thead>*/}
            {/*<tbody>*/}
              {/*{payments.map(p => (*/}
                {/*<tr>*/}
                  {/*<td>{p.id}</td>*/}
                {/*</tr>*/}
              {/*))}*/}
            {/*</tbody>*/}
          {/*</table>*/}
        {/*</div>*/}
        {/* TODO: add outcome list */}
        <div className='Program__outcome'>
          <h3>Outcome</h3>
          <table>
            <thead>
              <tr>
                <th>id</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map(({ id }) => (
                <tr key={id}>
                  <td>{id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ProgramPage;
