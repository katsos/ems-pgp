import React from 'react';
import { Button, Input, InputAdornment } from '@material-ui/core';
import { Student } from '../../../models';
import './NewPayment.scss';
import InfoModal from '../../modals/InfoModal';
import SelectStudent from '../../SelectStudent';

const FORM_INIT_DATA = {
  amount: '',
  notes: '',
  student_id: null,
  errors: {},
};

class NewPayment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...FORM_INIT_DATA,
      isInfoModalOpen: false,
      payment: null,
    };
    this.onReset = this.onReset.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.onClickModalOk = this.onClickModalOk.bind(this);
  }

  onChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  onReset(e) {
    e.preventDefault();
    this.setState({ ...FORM_INIT_DATA });
  }

  onConfirm(e) {
    e.preventDefault();
    const { student_id, amount, notes } = this.state;
    Student.setPayment(student_id, { amount, notes })
      .then(payment => this.setState({ payment, isInfoModalOpen: true }))
      .catch(({ response: { data: errors } }) => this.setState({ errors }));
  }

  onClickModalOk() {
    this.setState({ ...FORM_INIT_DATA, payment: null, isInfoModalOpen: false });
  }

  render() {
    const { amount, notes, isInfoModalOpen, payment } = this.state;

    return (
      <div className='NewPayment'>
        <form className='NewPayment__form'>
          <div>
            <SelectStudent
              onChange={student_id => this.setState({ student_id })}
            />
          </div>
          <Input
            name='amount'
            value={amount}
            onChange={this.onChange}
            placeholder='Ποσό'
            className='NewPayment__form__amount'
            endAdornment={<InputAdornment position='end'>&euro;</InputAdornment>}
          />
          <Input
            name='notes'
            value={notes}
            onChange={this.onChange}
            placeholder='Παρατηρήσεις'
          />
          <div className='NewPayment__form__buttons'>
            <Button color='primary' onClick={this.onConfirm}>ΥΠΟΒΟΛΗ</Button>
            <Button onClick={this.onReset}>ΚΑΘΑΡΙΣΜΑ</Button>
          </div>
        </form>
        {payment &&
          <InfoModal
            title='Successful payment'
            contentLabel='successful_payment'
            isOpen={isInfoModalOpen}
            onClick={this.onClickModalOk}
          >Payment #{payment.id} have been recorder successfully!
          </InfoModal>
        }
      </div>
    );
  }
}

export default NewPayment;
