import React from 'react';

import Http from '../../../Http';
import LoadingAnimation from "../../LoadingAnimation";

export default class ProgramPage extends React.Component {
  constructor(props) {
    super(props);

    this.program = {id: props.match.params.id};
    this._addStudent = this._addStudent.bind(this);
    this._editProgram = this._editProgram.bind(this);

    this.actions = {
      addStudent: this._addStudent
    };
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

  _addStudent() {
    throw Error('Not implemented yet!');
  }

  render() {
    if (this.state.isLoading) return <LoadingAnimation/>;

    return (
      <div className="program">
        <h2 className="program__title">{this.program.title}</h2>
        <button className="mdl-button mdl-js-button mdl-button--primary program__edit" onClick={this._editProgram}>
          <i className="material-icons">mode_edit</i> Edit Program
        </button>
        <div className="program__actions">
          <ActionsList actions={this.actions}/>
        </div>
      </div>
    )
  }
}

function ActionsList({actions}) {
  const list = Object.keys(actions).map(action => {
    return (
      <li className="mdl-list__item" key={action}>
        <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={actions[action]}>
          {action.camelCaseToSentence()}
        </button>
      </li>
    );
  });

  return (
    <ul className="mdl-list">
      {list}
    </ul>
  )
}
