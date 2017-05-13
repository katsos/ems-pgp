import React from 'react';
import Link  from 'react-router-dom/Link';

import {ROUTER_PREFIX} from './ProgramsRouter';
import Http from "../../../Http";

export default class ProgramsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {isLoading: true};
  }

  componentWillMount() {
    this._fetchPrograms();
  }

  _fetchPrograms() {
    return Http.get('/api/programs')
      .then(response => response.json())
      .then(function (data) {
        this.programs = data.programs;
        this.setState({isLoading: false});
      }.bind(this));
  }

  _renderList() {
    return this.programs.map(program => {
      return (
        <ul>
          <li key={program.id}>
            <Link to={`${ROUTER_PREFIX}/${program.id}`}>{program.title}</Link>
          </li>
        </ul>
      );
    });
  }

  render() {
    if (this.state.isLoading) return <h3>Programs list is loading...</h3>;

    return (
      <div className="programs mdl-grid">
        <h3>Active Programs</h3>
        {this._renderList()}
      </div>
    )
  }
}
