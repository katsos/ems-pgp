import React from 'react';
import PropTypes from 'prop-types';

import Http from "../../../Http";
import {isUndefined} from "../../../utils";
import LoadingAnimation from "../../LoadingAnimation";

export default class ProgramStudents extends React.Component {
  constructor(props) {
    super(props);

    this.students = props.students;
    this.programId = props.match.params.programId;
    this.state = {isLoading: false};
  }

  componentWillMount() {
    if (!isUndefined(this.students)) return;

    this.setState({isLoading: true});

    this._getStudents()
      .then(() => this.setState({isLoading: false}));
  }

  _getStudents() {
    return Http.get(`/api/programs/${this.programId}/students`)
      .then((response) => response.json())
      .then(data => this.students = data);
  }

  render() {
    if (this.state.isLoading) return <LoadingAnimation/>;

    return (
      <div className="program-students">
        Students' table placeholder :D
        {this.students.length}
        <div className="program-students__add">
          <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
            <i className="material-icons">add</i> Add new
          </button>
        </div>
      </div>
    )
  }
}

ProgramStudents.propTypes = {
  students: PropTypes.array
};
