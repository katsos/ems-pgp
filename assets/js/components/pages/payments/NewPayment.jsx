import React from 'react';
import Select from 'react-select';
import { Payment, Student } from '../../../models';
import './NewPayment.scss';
import InfoModal from "../../modals/InfoModal";

const FORM_INIT_DATA = {
  amount: 560,
  student: null,
  errors: {},
};

class NewPayment extends React.PureComponent {
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
    const { amount, isInfoModalOpen, payment, student, students } = this.state;
    if (students === null) return <h3>Loading...</h3>;

    return (
      <div className='NewPayment'>
        <form>
          <div>
            <label>Student:</label>
            <Select
              options={students}
              valueKey='id'
              simpleValue
              value={student}
              onChange={this.onChangeStudent}
              filterOptions={this.filterOptions}
            />
          </div>
          <div>
            <label>Amount:</label>
            <input name='amount' type='number' value={amount} onChange={this.onChange} />
          </div>
          <div>
            <button onClick={this.onReset}>Reset</button>
            <button onClick={this.onConfirm}>Confirm</button>
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
