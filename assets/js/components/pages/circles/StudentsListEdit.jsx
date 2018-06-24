import React from 'react';
import { Circle } from '../../../models';
import { ROUTER_PREFIX } from './Router';

class StudentsListEdit extends React.Component {
  constructor(props) {
    super(props);

    this.cycleId = this.props.match.params.id;
    this.state = {
      students: [],
    };
    this.onAddRow = this.onAddRow.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  onChange({ target: { name, value, checked }}, index) {
    const { students } = this.state;
    students[index][name] = (name === 'full_time') ? checked : value;
    this.setState({ students });
  }

  onConfirm() {
    Circle.setStudents(this.cycleId, this.state.students)
      .then(() => this.props.history.push(`${ROUTER_PREFIX}/${this.cycleId}`));
  }

  onAddRow() {
    const { students } = this.state;
    students.push({ id_university: '', name: '', surname: '', full_time: false });
    this.setState({ students });
  }

  render() {
    const { students } = this.state;

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>ΑΡ. ΜΗΤΡΩΟΥ</th>
              <th>ΕΠΩΝΥΜΟ</th>
              <th>ΟΝΟΜΑ</th>
              <th>Full-time</th>
            </tr>
          </thead>
          <tbody>
            {students.map(({ id_university, name, surname, fullTime }, index) => (
              <tr key={index}>
                <td><input name='id_university' value={id_university} onChange={e => this.onChange(e, index)} /></td>
                <td><input name='surname' value={surname} onChange={e => this.onChange(e, index)} /></td>
                <td><input name='name' value={name} onChange={e => this.onChange(e, index)} /></td>
                <td>
                  <input
                    name='full_time'
                    value={fullTime}
                    onChange={e => this.onChange(e, index)}
                    type='checkbox'
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={this.onAddRow}>ΠΡΟΣΘΗΚΗ ΠΕΔΙΟΥ</button>
        <button onClick={this.onConfirm}>ΕΠΙΒΕΒΑΙΩΣΗ</button>
      </div>
    );
  }
}

export default StudentsListEdit;
