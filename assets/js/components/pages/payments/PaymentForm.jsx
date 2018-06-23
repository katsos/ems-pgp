import React from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import './PaymentForm.scss';

function PaymentForm({ payment: { amount, notes, student }, onChange, onConfirm, onCancel }) {
  return (
    <form className='PaymentForm'>
      <div>
        <p>{`Φοιτητής: ${student.surname} ${student.name} (#${student.id})`}</p>
        <p>{`Κύκλος: ${student.circle.title}`}</p>
      </div>
      <Input
        name='amount'
        value={amount}
        onChange={onChange}
        placeholder='Ποσό'
        endAdornment={<InputAdornment position='end'>&euro;</InputAdornment>}
      />
      <Input
        name='notes'
        value={notes}
        onChange={onChange}
        placeholder='Παρατηρήσεις'
      />
      <div className='PaymentForm__buttons'>
        <Button color='primary' onClick={onConfirm}>ΕΠΙΒΕΒΑΙΩΣΗ</Button>
        {onCancel && <Button color='secondary' onClick={onCancel}>ΑΚΥΡΩΣΗ</Button>}
      </div>
    </form>
  );
}

PaymentForm.propTypes = {
  payment: PropTypes.shape({
    amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    notes: PropTypes.string.isRequired,
    student: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      surname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
};

export default PaymentForm;
