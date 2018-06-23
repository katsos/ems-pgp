import React from 'react'
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import BudgetActions from './BudgetActions';
import ExpenseDialog from './ExpenseDialog';

class BudgetFieldRow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isExpenseDialogOpen: false,
    };
    this.onAction = this.onAction.bind(this);
  }

  onAction(action) {
    switch (action) {
      case 'expense':
        return this.setState({ isExpenseDialogOpen: true });
    }
  }

  render() {
    const { field } = this.props;
    const { isExpenseDialogOpen } = this.state;
    const sumSpent = field.expenses
      .reduce((sum, { amount }) => sum + parseFloat(amount), 0);
    const remaining = (parseFloat(field.amount) - sumSpent).toFixed(2);
    return (
      <TableRow>
        <TableCell>{field.code}</TableCell>
        <TableCell>{field.title}</TableCell>
        <TableCell numeric>{field.amount}</TableCell>
        <TableCell numeric>{sumSpent.toFixed(2)}</TableCell>
        <TableCell numeric>{remaining}</TableCell>
        <TableCell><BudgetActions onSelect={this.onAction} /></TableCell>

        <ExpenseDialog
          field={field}
          isOpen={isExpenseDialogOpen}
          onCancel={() => this.setState({ isExpenseDialogOpen: false })}
        />
      </TableRow>
    );
  }
}

BudgetFieldRow.propTypes = {
  field: PropTypes.shape({
    code: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired,
    expenses: PropTypes.arrayOf(PropTypes.shape({
      amount: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
};

export default BudgetFieldRow;
