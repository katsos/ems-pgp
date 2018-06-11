import React from 'react';

class StudentsListEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      students: [],
    };
    this.onAddRow = this.onAddRow.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  onChange({ target: { name, value }}, index) {
    const { students } = this.state;
    students[index][name] = value;

    this.setState({ students });
  }

  onConfirm() {

  }

  onAddRow() {
    const { students } = this.state;
    students.push({ name: '', surname: '' });
    this.setState({ students });
  }

  render() {
    const { students } = this.state;

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>ΕΠΩΝΥΜΟ</th>
              <th>ΟΝΟΜΑ</th>
            </tr>
          </thead>
          <tbody>
            {students.map(({ name, surname }, index) => (
              <tr key={index}>
                <td><input name='surname' value={surname} onChange={e => this.onChange(e, index)} /></td>
                <td><input name='name' value={name} onChange={e => this.onChange(e, index)} /></td>
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
