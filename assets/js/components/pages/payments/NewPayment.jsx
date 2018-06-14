import React from 'react';
import Select from 'react-select';
import { Button, Input, InputAdornment } from '@material-ui/core';
import { Payment, Student } from '../../../models';
import './NewPayment.scss';
import InfoModal from "../../modals/InfoModal";

const FORM_INIT_DATA = {
  amount: '',
  notes: '',
  student: null,
  errors: {},
};

class NewPayment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...FORM_INIT_DATA,
      isInfoModalOpen: false,
      students: null,
      payment: null,
    };
    this.onReset = this.onReset.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.filterOptions = this.filterOptions.bind(this);
    this.onClickModalOk = this.onClickModalOk.bind(this);
    this.onChangeStudent = this.onChangeStudent.bind(this);
  }

  componentDidMount() {
    Student.getAll()
      .then(students => {
        students = students.map(s => Object.assign(s, { label: `${s.surname} ${s.name} (${s.id})` }));
        this.setState({ students });
      });
  }

  filterOptions(options, filter, currentValues) {
    return options.filter(v => v.label.includes(filter));
  }

  onChangeStudent(studentId) {
    const { students } = this.state;
    const student = students.find(s => s.id === studentId);
    this.setState({ student });
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
    const { student, amount } = this.state;
    const data = {
      student,
      amount,
    };
    Payment.create(data)
      .then(payment => this.setState({ payment, isInfoModalOpen: true }))
      .catch(({ response: { data: errors }}) => this.setState({ errors }));
  }

  onClickModalOk() {
    this.setState({ ...FORM_INIT_DATA, payment: null, isInfoModalOpen: false });
  }

  render() {
    const { amount, notes, isInfoModalOpen, payment, student, students } = this.state;
    if (students === null) return <h3>Loading...</h3>;

    return (
      <div className='NewPayment'>
        <form className='NewPayment__form'>
          <div>
            <Select
              options={students}
              valueKey='id'
              simpleValue
              value={student}
              onChange={this.onChangeStudent}
              filterOptions={this.filterOptions}
              placeholder='Επιλέξτε φοιτητή'
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
          >Payment #{payment.id} have been recorder successfully!</InfoModal>
        }
      </div>
    );
  }
}

export default NewPayment;
