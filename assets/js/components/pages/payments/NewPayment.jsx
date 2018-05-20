import React from 'react';
import Select from 'react-select';
import { Payment, Registration, Student } from '../../../models';
import './NewPayment.scss';

const FORM_INIT_DATA = {
  amount: 560,
  student: null,
  registration: null,
  errors: {},
};

class NewPayment extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      ...FORM_INIT_DATA,
      students: null,
    };
    this.onReset = this.onReset.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.filterOptions = this.filterOptions.bind(this);
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

  onChangeStudent(student_id) {
    Registration.getAll({ student: student_id })
      .then(registrations => this.setState({ registration:  registrations[0] }));
    const { students } = this.state;
    const student = students.find(s => s.id === student_id);
    this.setState({ student });
  }

  onChange({ target: { name, value }}) {
    this.setState({ [name]: value });
  }

  onReset(e) {
    e.preventDefault();
    this.setState({ ...FORM_INIT_DATA });
  }

  onConfirm(e) {
    e.preventDefault();
    const { student, amount, registration } = this.state;
    const data = {
      student,
      amount,
      registration: registration.id,
    };
    Payment.create(data)
      .then(payment => {
        console.log(payment)
      })
      .catch(({ response: { data: errors }}) => this.setState({ errors }));
  }

  render() {
    const { amount, registration, student, students } = this.state;
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
            {registration && <label>Reason: {`${registration.program.title} (${registration.program.year})`}</label>}
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
      </div>
    );
  }
}

export default NewPayment;
