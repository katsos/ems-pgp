import React from 'react';
import Select from 'react-select';
import Student from '../../../models/Student';

class NewPayment extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      student: null,
      students: null,
    };
    this.onChangeStudent = this.onChangeStudent.bind(this);
    this.filterOptions = this.filterOptions.bind(this);
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
    const { students } = this.state;
    const student = students.find(s => s.id === student_id);
    this.setState({ student });
  }

  render() {
    const { student, students } = this.state;
    if (students === null) return <h3>Loading...</h3>;

    return (
      <div>
        <Select
					options={students}
          valueKey='id'
					simpleValue
					value={student}
					onChange={this.onChangeStudent}
          filterOptions={this.filterOptions}
				/>
      </div>
    );
  }
}

export default NewPayment;
