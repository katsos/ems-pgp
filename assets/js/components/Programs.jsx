import React from 'react';
import Link  from 'react-router-dom/Link';

export default class Programs extends React.Component {
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
          <Link to={`/programs/${program.id}`}>{program.name}</Link>
        </li>
      );
    });
  }

  render() {
    return (
      <div className="programs">
        Programs list EXACTLY here!asdf
        <ul className="programs__list">
          {this._getProgramsList()}
        </ul>
      </div>
    )
  }
}
