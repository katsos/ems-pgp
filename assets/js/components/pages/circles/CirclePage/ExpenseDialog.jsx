import React from 'react';
import { Button, Dialog, DialogTitle, withStyles } from '@material-ui/core';

class ExpenseDialog extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      amount: 0,
      notes: '',
    };
  }

  render() {
    const { classes, isOpen, onCancel } = this.props;
    const { amount, notes } = this.state;

    return (
      <Dialog open={isOpen}>
        <DialogTitle id="simple-dialog-title">Νέo έξοδο</DialogTitle>
        <div>
          <Button color='secondary' className={classes.button} onClick={onCancel}>ΑΚΥΡΩΣΗ</Button>
          <Button color='primary' className={classes.button} onClick={this.onConfirm}>ΕΠΙΒΕΒΑΙΩΣΗ</Button>
        </div>
      </Dialog>
    );
  }
}

const ExpenseDialogWithStyles = withStyles()(ExpenseDialog);
export default ExpenseDialogWithStyles;
