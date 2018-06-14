import React from 'react';
import { withRouter } from 'react-router';
import { Button, Dialog, DialogTitle } from '@material-ui/core';
import { Student } from '../../../../models';

class PaymentDialog extends React.PureComponent {
  constructor(props) {
    super(props);

    this.cycleId = this.props.match.params.id;
    this.state = {
      amount: 0,
      notes: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  onChange({ target: { name, value }}) {
    this.setState({ [name]: value });
  }

  onConfirm() {
    Student.setPayment(this.props.student.id, { ...this.state })
      .then(() => this.props.onConfirm());
      // TODO: update cycle page
      // TODO: catch
  }

  render() {
    const { student: { id, name, surname }, isOpen, onCancel } = this.props;
    const { amount, notes } = this.state;

    return (
      <Dialog open={isOpen}>
        <DialogTitle id="simple-dialog-title">Νέα πληρωμή</DialogTitle>
        <table>
          <tbody>
          <tr>
            <td>Φοιτητής:</td>
            <td>{`${surname} ${name} (#${id})`}</td>
          </tr>
          <tr>
            <td>Κύκλος:</td>
            <td>#{this.cycleId}</td>
          </tr>
          <tr>
            <td>Ποσό:</td>
            <td><input name='amount' value={amount} type='number' onChange={this.onChange}/></td>
          </tr>
          <tr>
            <td>Σχόλια:</td>
            <td><input name='notes' value={notes} onChange={this.onChange} /></td>
          </tr>
          </tbody>
        </table>
        <div>
          <Button color='secondary' onClick={onCancel}>ΑΚΥΡΩΣΗ</Button>
          <Button color='primary' onClick={this.onConfirm}>ΕΠΙΒΕΒΑΙΩΣΗ</Button>
        </div>
      </Dialog>
    );
  }
}

const PaymentDialogWithRouter = withRouter(PaymentDialog);
export default PaymentDialogWithRouter;
