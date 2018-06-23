import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Student } from '../models/index';
import PaymentForm from './pages/payments/PaymentForm';

class PaymentDialog extends React.PureComponent {
  constructor(props) {
    super(props);

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
      .then(this.props.onConfirm);
      // TODO: update cycle page
      // TODO: catch
  }

  render() {
    const { student, isOpen, onCancel } = this.props;
    const { amount, notes } = this.state;

    return (
      <Dialog open={isOpen}>
        <DialogTitle id="simple-dialog-title">Νέα πληρωμή</DialogTitle>
        <PaymentForm
          payment={{ amount, notes, student }}
          onChange={this.onChange}
          onConfirm={this.onConfirm}
          onCancel={onCancel}
        />
      </Dialog>
    );
  }
}

PaymentDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default PaymentDialog;
