import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class Form extends React.PureComponent {
  constructor(props) {
    super(props);

    const { initialData, schema } = props;
    this.state = Object.entries(schema).reduce((state, [key, { type }]) => {
      const value = (type === 'date') ? moment().format('YYYY-MM-DD') : '';
      return Object.assign(state, { [key]: (initialData[key] || value) });
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
        <button onClick={this.onSubmit}>Submit</button>
      </form>
    );
  }
}

Form.propTypes = {
  initialData: PropTypes.object,
  errors: PropTypes.object.isRequired,
  schema: PropTypes.shape({
    label: PropTypes.string,
    type: PropTypes.string,
  }),
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

Form.defaultProps = {
  initialData: {},
};

export default Form;
