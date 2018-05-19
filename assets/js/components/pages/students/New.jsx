import React from 'react';
import moment from 'moment';
import Student from "../../../models/Student";
import Program from "../../../models/Program";
import LoadingAnimation from "../../LoadingAnimation";

class New extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      name: '',
      surname: '',
      email: 'example@domain.gr',
      registered_at: moment().format('YYYY-MM-DD'),
      program: null,
      programs: null,
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    Program.getAll()
      .then(programs => {
        const program = (programs.length) ? programs[0].id : null;
        this.setState({ program ,programs });
      })
      .finally(() => this.setState({ isLoading: false }));
  }

  onChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  onSubmit(e) {
    e.preventDefault();
    Student.create(this.state)
      .then(student => this.props.history.push(`/students/${student.id}`, { student }))
      .catch(({ response: { data: errors }}) => this.setState({ errors }));
  }

  render() {
    const { isLoading, programs, program, name, surname, email, registered_at, errors } = this.state;

    if (isLoading) return <LoadingAnimation />;

    if (programs === null) return <h3>We were unable to fetch available programs. Try again later.</h3>;

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Name:</label>
            <input name='name' value={name} onChange={this.onChange} />
            {(errors.name || []).map((e) => <div key={e}>{e}</div>)}
          </div>
          <div>
            <label>Surname:</label>
            <input name='surname' value={surname} onChange={this.onChange} />
            {(errors.surname || []).map((e) => <div key={e}>{e}</div>)}
          </div>
          <div>
            <label>E-mail:</label>
            <input type='email' name='email' value={email} onChange={this.onChange} />
            {(errors.email || []).map((e) => <div key={e}>{e}</div>)}
          </div>
          <div>
            <label>Registered at:</label>
            <input type='date' name='registered_at' value={registered_at} onChange={this.onChange} />
            {(errors.registered_at || []).map((e) => <div key={e}>{e}</div>)}
          </div>
          <div>
            <label>Program:</label>
            <select name='program' value={program} onChange={this.onChange}>
              {programs.map(({ id, title, year }) => (
                <option value={id} key={`${title}_${year}`}>{`${title} (${year})`}</option>
              ))}
            </select>
            {(errors.program || []).map((e) => <div key={e}>{e}</div>)}
          </div>

          {/*<button onClick={this.onCancel}>Cancel</button>*/}
          <input type='submit' value='Submit' />
        </form>
      </div>
    );
  }
}

export default New;
