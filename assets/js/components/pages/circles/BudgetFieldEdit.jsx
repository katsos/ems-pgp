import React from 'react';
import PropTypes from 'prop-types';

class BudgetFieldEdit extends React.Component {
  constructor(props) {
    super(props);

    const { code = '', title = '', amount = 0 } = this.props.field;
    this.state = { code, title, amount };
    this.onChange = this.onChange.bind(this);
  }

  onChange({ target: { name, value }}) {
    this.setState({ [name]: value });
  }

  render() {
    const { code, title, amount } = this.state;

    return (
      <tr>
        <td><input name='code' value={code} onChange={this.onChange} /></td>
        <td><input name='title' value={title} onChange={this.onChange} /></td>
        <td><input name='amount' value={amount} onChange={this.onChange} type='number' /></td>

        <td><button onClick={() => this.props.onConfirm(this.state)}>Εισαγωγή</button></td>
        <td><button onClick={this.props.onCancel}>Ακύρωση</button></td>
      </tr>
    );
  }
}

BudgetFieldEdit.propTypes = {
  field: PropTypes.shape({
    code: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }),
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

BudgetFieldEdit.defaultProps = {
  field: {},
};

export default BudgetFieldEdit;
