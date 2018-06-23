import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CheckMark from '@material-ui/icons/Check';
import './ExpensesSection.scss';

function ExpensesSection({ budget }) {
  const fields = budget.fields || [];
  const expenses = fields
    .reduce((arr, field) => [...arr, ...field.expenses], [])
    .sort((a, b) => Date(a.created_at) > Date(b.created_at));

  if (!expenses.length) return null;

  return (
    <div className='ExpensesSection'>
      <h4>Έξοδα κύκλου</h4>
      <Table className='ExpensesSection__table'>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>ΑΙΤΙΟΛΟΓΙΑ</TableCell>
            <TableCell numeric>ΠΟΣΟ</TableCell>
            <TableCell className='ExpensesSection__table__completed'>
              ΟΛΟΚΛΗΡΩΜΕΝΟ
            </TableCell>
            <TableCell>ΠΑΡΑΤΗΡΗΣΕΙΣ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map(e => (
            <TableRow>
              <TableCell>{e.id}</TableCell>
              <TableCell>{e.type}</TableCell>
              <TableCell numeric>{e.amount}</TableCell>
              <TableCell className='ExpensesSection__table__completed'>
                {e.is_completed ? <CheckMark /> : null}
              </TableCell>
              <TableCell>{e.notes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

ExpensesSection.propTypes = {
  budget: PropTypes.shape({
    fields: PropTypes.arrayOf(PropTypes.shape({
      expenses: PropTypes.arrayOf(PropTypes.shape({
        created_at: PropTypes.string.isRequired,
      })),
    })).isRequired,
  }).isRequired,
};

export default ExpensesSection;
