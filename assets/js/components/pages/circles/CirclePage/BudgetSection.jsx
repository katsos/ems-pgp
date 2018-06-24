import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Link from 'react-router-dom/Link';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
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
        <h4>Προϋπολογισμός</h4>
      </div>
      <div>Δημιουργήθηκε στις {moment(budget.created_at).format('L')}</div>

      <Table className='CirclePage__budget__table'>
        <TableHead>
          <TableRow>
            <TableCell colSpan='2'>Κατηγορίες Δαπανών</TableCell>
            <TableCell numeric>ΠΡΟΫΠΟΛΟΓΙΣΜΟΣ</TableCell>
            <TableCell numeric>ΕΞΟΔΑ</TableCell>
            <TableCell numeric>ΔΙΑΘΕΣΙΜΟ ΥΠΟΛΟΙΠΟ</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {budget.fields
            .sort((a, b) => a.id > b.id) // sort by id ascending
            .map(f => <BudgetFieldRow key={f.id} field={f} />)
          }
        </TableBody>
      </Table>
    </div>
  );
}

BudgetSection.propTypes = {
  circleId: PropTypes.string.isRequired,
  budget: PropTypes.shape({
    fields: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
    })).isRequired,
  }),
};

BudgetSection.defaultProps = {
  budget: null,
};

export default BudgetSection;
