import React from 'react';
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
    const { code, title, amount } = this.props.field;
    const { isExpenseDialogOpen } = this.state;

    return (
      <tr>
        <td>{code}</td>
        <td>{title}</td>
        <td>{amount}</td>
        <td><BudgetActions onSelect={this.onAction} /></td>
        <ExpenseDialog isOpen={isExpenseDialogOpen} onCancel={() => this.setState({ isExpenseDialogOpen: false })}/>
      </tr>
    );
  }
}

export default BudgetFieldRow;
