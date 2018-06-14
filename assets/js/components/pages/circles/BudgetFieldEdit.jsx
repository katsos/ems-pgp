import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './BudgetFieldEdit.scss';

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
      <tr className='BudgetFieldEdit'>
        <td>
          <TextField
            name='code'
            value={code}
            onChange={this.onChange}
          />
        </td>
        <td>
          <TextField
            name='title'
            value={title}
            onChange={this.onChange}
          />
        </td>
        <td>
          <TextField
            name='amount'
            value={amount}
            onChange={this.onChange}
            type='number'
          />
        </td>

        <td>
          <Button color='primary' onClick={() => this.props.onConfirm(this.state)}>ΕΙΣΑΓΩΓΗ</Button>
          <Button onClick={this.props.onCancel}>ΑΚΥΡΩΣΗ</Button>
        </td>
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
