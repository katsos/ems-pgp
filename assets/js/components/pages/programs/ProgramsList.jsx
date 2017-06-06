import React from 'react';
import Link  from 'react-router-dom/Link';

import {ROUTER_PREFIX} from './ProgramsRouter';
import Http from "../../../Http";
import LoadingAnimation from "../../LoadingAnimation";

export default class ProgramsList extends React.Component {
  constructor(props) {
    super(props);

    this.listState = this.props.location.pathname.split('/').pop();
    this.state = {isLoading: true};
  }

  componentWillMount() {
    this._fetchPrograms();
  }

  _fetchPrograms() {
    let url = '/api/programs';

    if (this.listState === 'active' || this.listState === 'finished')
      url += `?state=${this.listState}`;

    return Http.get(url)
      .then(response => response.json())
      .then(data => {
        this.programs = data.programs;
        this.setState({isLoading: false});
      })
      .catch(response => {
        console.error(response);
        this.setState({errorEncountered: true});
      });
  }

  _renderList() {
    const listItems = this.programs.map(program => {
      return (
        <li key={program.id}>
          <Link to={`${ROUTER_PREFIX}/${program.id}`}>{program.title}</Link>
        </li>
      );
    });

    return <ul>{listItems}</ul>
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingAnimation/>;
    }
    if (this.state.errorEncountered) {
      return <h3>There was an error while loading programs.</h3>
    }
    if (this.programs.length === 0) {
      return <h3>There are no {this.listState} programs available!</h3>;
    }

    return (
      <div className="programs-list mdl-grid">
        <h3 className="programs-list__title">Active Programs</h3>
        <div className="programs-list__list">
          {this._renderList()}
        </div>
      </div>
    )
  }
}
