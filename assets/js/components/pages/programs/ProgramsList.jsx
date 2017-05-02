import React from 'react';
import Link  from 'react-router-dom/Link';

import {ROUTER_PREFIX} from './ProgramsRouter';

export default class ProgramsList extends React.Component {
  constructor(props) {
    super(props);

    this.programsList = [
      {
        id: 1,
        name: 'Τεχνολογίες και Εφαρμογές Ιστού  (MSc in Web Engineering)'
      },
      {
        id: 2,
        name: 'Τηλεπικοινωνιακά Δίκτυα και Υπηρεσίες Τηλεματικής (MSc in Telecommunication Networks and Telematic Services)'
      },
      {
        id: 3,
        name: 'Πληροφοριακά Συστήματα στη Διοίκηση Επιχειρήσεων (MSc in Advanced Information Systems in Business)'
      }
    ];
  }

  _getProgramsList() {
    return this.programsList.map((program, index) => {
      return (
        <li key={index}>
          <Link to={`${ROUTER_PREFIX}/${program.id}`}>{program.name}</Link>
        </li>
      );
    });
  }

  render() {
    return (
      <div className="programs mdl-grid">
        <h3>Active Programs</h3>
        <ul>
          {this._getProgramsList()}
        </ul>
      </div>
    )
  }
}
