import React from 'react';
import moment from 'moment';

class Form extends React.PureComponent {
  constructor(props) {
    super(props);

    const { schema } = props;
    this.state = Object.entries(schema).reduce((state, [key, { type }]) => {
      const value = (type === 'date') ? moment().format('YYYY-MM-DD') : '';
      return Object.assign(state, { [key]: value })
    }, {});

    this.onChange = this.onChange.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  onCancel(event) {
    event.preventDefault();
    this.props.onCancel();
  }
  onSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state);
  }

  render() {
    const { errors, schema } = this.props;

    return (
      <form>
        {Object.entries(schema).map(([name, { label, type = 'text' }]) => (
          <div key={name}>
            <label>{label}: </label>
            <input
              name={name}
              value={this.state[name]}
              type={type}
              onChange={this.onChange}
            />
            {(errors[name] || []).map((e, index) => <div key={`error_${name}_${index}`}>{e}</div>)}
          </div>
        ))}

        <button onClick={this.onCancel}>Cancel</button>
        <button onClick={this.onSubmit}>Add</button>
      </form>
    );
  }
}

export default Form;
