import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { Student } from '../models';

class SelectStudent extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      students: null,
      selectedStudent: null,
    };
    this.onChange = this.onChange.bind(this);
    this.filterOptions = this.filterOptions.bind(this);
  }

  componentDidMount() {
    Student.getAll()
      .then(students => this.setState({ students: students.map(this.assignLabel) }))
      // TODO: add catch
  }

  onChange(studentId) {
    const { students } = this.state;
    const selectedStudent = students.find(s => s.id === studentId);
    this.setState({ selectedStudent });
    this.props.onChange(studentId);
  }

  assignLabel(student) {
    return Object.assign(student, { label: `${student.surname} ${student.name} (${student.id})` });
  }

  filterOptions(options, filter) {
    return options.filter(v => v.label.includes(filter));
  }

  render() {
    const { students, selectedStudent } = this.state;

    return (
      <Select
        options={students || null}
        valueKey='id'
        simpleValue
        value={selectedStudent}
        onChange={this.onChange}
        filterOptions={this.filterOptions}
        placeholder='Επιλέξτε φοιτητή'
        disabled={students === null}
      />
    );
  }
}

SelectStudent.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default SelectStudent;
