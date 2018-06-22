import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BudgetFieldRow from './BudgetFieldRow';

function BudgetSection({ budget, circleId }) {
  if (!budget) {
    return (
      <div className='CirclePage'>
        <hr />
        <p>Δεν έχει καταχωρηθέι προϋπολογισμός για αυτό το πρόγραμμα. <br />
        Δημιουργήστε τον προϋπολογισμό πατώντας το κουμπί. <br />
          <span>Δεν θα μπορείτε να καταγράψετε συναλλαγές έως ώτου υπάρξει επιτυχής καταχώρηση.</span>
        </p>
        <Link
          className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored'
          to={`/circles/${circleId}/budget`}
        >ΔΗΜΙΟΥΡΓΙΑ ΠΡΟΫΠΟΛΟΓΙΣΜΟΥ
        </Link>
      </div>
    );
  }

  return (
    <div className='CirclePage__budget'>

      <div className='CirclePage__budget__header'>
        <h3>Προϋπολογισμός</h3>
      </div>
      <div>Δημιουργήθηκε στις {moment(budget.created_at).format('L')}</div>

      <table className='CirclePage__budget__table'>
        <thead>
          <tr>
            <th colSpan='2'>Κατηγορίες Δαπανών</th>
            <th>Προυπολογυσμός</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {budget.fields.map(f => <BudgetFieldRow key={f.id} field={f} />)}
        </tbody>
      </table>
    </div>
  );
}

BudgetSection.propTypes = {
  circleId: PropTypes.number.isRequired,
  budget: PropTypes.shape({
    fields: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
    })).isRequired,
  }).isRequired,
};

export default BudgetSection;
