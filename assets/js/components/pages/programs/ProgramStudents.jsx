import React from 'react';
import { Link } from "react-router-dom";
import Program from "../../../models/Program";
import LoadingAnimation from "../../LoadingAnimation";

export default class ProgramStudents extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      students: null,
    };
  }

  // componentWillMount() {
  //   if (!isUndefined(this.students)) return;
  //
  //   this.setState({isLoading: true});
  //
  //   this._getStudents()
  //     .then(() => this.setState({isLoading: false}));
  // }
  //
  // _getStudents() {
  //   return Http.get(`/api/programs/${this.programId}/students`)
  //     .then((response) => response.json())
  //     .then(data => this.students = data);
  // }

  componentDidMount() {
    const { programId } = this.props.match.params;

    Program.getStudents(programId)
      .then(students => this.setState({ students }))
      .catch(console.error)
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    if (this.state.isLoading) return <LoadingAnimation/>;

    if (this.state.students === null) return <h3>There was an error while fetching the students.</h3>;

    return (
      <div className="program-students">
        <ul>
          {this.state.students.map(({ id, name, surname }) => {
            return (
              <li key={id}>
                <Link to={`/students/${id}`}>{surname} {name} ({id})</Link>
              </li>
            );
          })}
        </ul>
        <div className="program-students__add">
          <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
            <i className="material-icons">add</i> Add new
          </button>
        </div>
      </div>
    )
  }
}
