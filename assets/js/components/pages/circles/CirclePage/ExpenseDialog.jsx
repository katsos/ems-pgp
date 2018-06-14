import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Dialog, DialogTitle, withStyles } from '@material-ui/core';
import { Expense } from '../../../../models';

class ExpenseDialog extends React.PureComponent {
  constructor(props) {
    super(props);

    const { field } = this.props;
    this.cycleId = this.props.match.params.id;
    this.state = {
      budget_field: (field) ? field.id : '',
      type: '',
      amount: 0,
      notes: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange({ target: { name, value }}) {
    this.setState({ [name]: value });
  }

  onSubmit() {
    Expense.create(this.state)
      // TODO: inform for the successful POST
      .then(this.props.onCancel);
      // TODO: catch
  }

  render() {
    const { classes, field, isOpen, onCancel } = this.props;
    const { budget_field, type, amount, notes } = this.state;

    // TODO: show form errors
    return (
      <Dialog open={isOpen}>
        <DialogTitle>Νέo έξοδο</DialogTitle>
        <form>
          <div>
            <label>Κατηγορία προϋπολογισμού:</label>
            {field ?
              <span>{`${field.code} ${field.title}`}</span>
              : <input name='budget_field' value={budget_field} type='number' />
            }
          </div>
          <div>
            <label>Περιγραφή:</label>
            <input name='type' value={type} onChange={this.onChange} />
          </div>
          <div>
            <label>Ποσό:</label>
            <input name='amount' value={amount} onChange={this.onChange} />
          </div>
          {/* TODO */}
          {/*<FormControlLabel*/}
            {/*control={*/}
              {/*<Checkbox*/}
                {/*name='is_completed'*/}
                {/*checked={is_completed}*/}
                {/*onChange={() => this.setState({ is_completed: !is_completed })}*/}
              {/*/>*/}
            {/*}*/}
            {/*label='ΟΛΟΚΛΗΡΩΜΕΝΗ'*/}
          {/*/>*/}
          <div>
            <label>Σχόλια:</label>
            <input name='notes' value={notes} onChange={this.onChange} />
          </div>
          <Button color='secondary' className={classes.button} onClick={onCancel}>ΑΚΥΡΩΣΗ</Button>
          <Button color='primary' className={classes.button} onClick={this.onSubmit}>ΥΠΟΒΟΛΗ</Button>
        </form>
      </Dialog>
    );
  }
}

const ExpenseDialogWithStyles = withStyles()(ExpenseDialog);
const ExpenseDialogWithRouter = withRouter(ExpenseDialogWithStyles);
export default ExpenseDialogWithRouter;
