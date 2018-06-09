import React from 'react';

class BudgetFieldEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      code: '',
      title: '',
      amount: 0,
    };
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

export default BudgetFieldEdit;
