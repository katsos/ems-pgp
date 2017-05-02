import React from 'react';
import Link  from 'react-router-dom/Link';

const ACTIONS = [
  {
    title: 'Add new program',
    description: 'By pressing this button you can start a new program.',
    icon: 'add'
  },
  {
    title: 'Active programs',
    description: 'View all active programs.',
    icon: 'view_list'
  },
  {
    title: 'Finished programs',
    description: 'View all finished programs.',
    icon: 'unarchive'
  }
];

export default class Programs extends React.Component {
  constructor(props) {
    super(props);

    // this.programsList = [
    //   {
    //     id: 1,
    //     name: 'Τεχνολογίες και Εφαρμογές Ιστού  (MSc in Web Engineering)'
    //   },
    //   {
    //     id: 2,
    //     name: 'Τηλεπικοινωνιακά Δίκτυα και Υπηρεσίες Τηλεματικής (MSc in Telecommunication Networks and Telematic Services)'
    //   },
    //   {
    //     id: 3,
    //     name: 'Πληροφοριακά Συστήματα στη Διοίκηση Επιχειρήσεων (MSc in Advanced Information Systems in Business)'
    //   }
    // ];
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

  _getProgramsActions() {
    return ACTIONS.map((action, index) => {
      return (
        <div
          key={index}
          className="programs__action mdl-cell mdl-button mdl-js-button mdl-button--primary"
          title={action.description}
        >
          <i className="material-icons">{action.icon}</i>
          <span>{action.title}</span>
        </div>
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
