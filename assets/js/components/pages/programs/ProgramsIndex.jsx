import React from 'react';
import Link  from 'react-router-dom/Link';

import {ROUTER_PREFIX} from './ProgramsRouter';

const ACTIONS = [
  {
    title: 'Add new program',
    description: 'By pressing this button you can start a new program.',
    icon: 'add',
    linkTo: '/new'
  },
  {
    title: 'Active programs',
    description: 'View all active programs.',
    icon: 'view_list',
    linkTo: '/active'
  },
  {
    title: 'Finished programs',
    description: 'View all finished programs.',
    icon: 'unarchive',
    linkTo: '/archived'
  }
];

export default class ProgramsIndex extends React.Component {
  _getProgramsActions() {
    return ACTIONS.map((action, index) => {
      return (
        <Link to={`${ROUTER_PREFIX}${action.linkTo}`}
          key={index}
          className="programs__action mdl-cell mdl-button mdl-js-button mdl-button--primary"
          title={action.description}
        >
          <i className="material-icons">{action.icon}</i>
          <span>{action.title}</span>
        </Link>
      );
    });
  }

  render() {
    return (
      <div className="programs mdl-grid">
        {this._getProgramsActions()}
      </div>
    )
  }
}
