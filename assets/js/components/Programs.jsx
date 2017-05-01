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

  // _getProgramsList() {
  //   return this.programsList.map((program, index) => {
  //     return (
  //       <li key={index}>
  //         <Link to={`/programs/${program.id}`}>{program.name}</Link>
  //       </li>
  //     );
  //   });
  // }

  render() {
    return (
      <div className="programs mdl-grid">
        <div className="programs__action mdl-cell mdl-button mdl-js-button mdl-button--primary">
          <i class="material-icons mdl-48">add</i>
          <span>Add new program</span>
        </div>
        <div className="programs__action mdl-cell mdl-button mdl-js-button mdl-button--primary">
          <span>View all active programs</span>
        </div>
        <div className="programs__action mdl-cell mdl-button mdl-js-button mdl-button--primary">
          <span>View finished programs</span>
        </div>
      </div>
    )
  }
}
