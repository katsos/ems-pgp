import React from 'react';
import Link  from 'react-router-dom/Link';

import {ROUTER_PREFIX} from './ProgramsRouter';
import LoadingAnimation from "../../LoadingAnimation";
import Program from '../../../models/Program';

class ProgramsList extends React.Component {
  constructor(props) {
    super(props);

    this.listState = this.props.location.pathname.split('/').pop();
    this.state = {
      isLoading: true,
      programs: null,
    };
  }

  componentWillMount() {
    this._fetchPrograms();
  }

  _fetchPrograms() {
    let url = '/api/programs';

    if (this.listState === 'active' || this.listState === 'finished')
      url += `?state=${this.listState}`;

    return Program.getAll()
      .then((programs) => this.setState({ programs }))
      .catch((response) => {
        console.error(response);
        this.setState({ programs: null });
      })
      .finally(() => this.setState({isLoading: false}));
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingAnimation/>;
    }
    if (this.state.programs === null) {
      return <h3>There was an error while loading programs.</h3>
    }
    if (!this.state.programs.length) {
      return <h3>There are no {this.listState} programs available!</h3>;
    }

    return (
      <div className="programs-list mdl-grid">
        <h3 className="programs-list__title">Active Programs</h3>
        <div className="programs-list__list">
          <ul>
            {this.state.programs.map(({id, title}) => {
              return (
                <li key={id}>
                  <Link to={`${ROUTER_PREFIX}/${id}`}>{title}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export default ProgramsList;
