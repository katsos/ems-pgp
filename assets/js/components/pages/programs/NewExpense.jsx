import React from 'react';
import { Expense } from '../../../models';

class NewExpense extends React.Component {
  constructor(props) {
    super(props);

    this.programId = this.props.match.params.id;
    this.state = {
      type: '',
      notes: '',
      amount: 0,
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange({ target: { name, value }}) {
    this.setState({ [name]: value });
  }

  onSubmit(event) {
    event.preventDefault();
    const { type, notes, amount } = this.state;
    Expense.create({ program: this.programId, type, notes, amount })
      .then(expense => console.log(expense))
      .catch(({ response: { data: errors }}) => this.setState({ errors }));
  }

  render() {
    const { type, notes, amount, errors } = this.state;

    return (
      <form>
        <div>
          <label>Type:</label>
          <input name='type' value={type} onChange={this.onChange} />
          {(errors.type || []).map((e) => <div key={e}>{e}</div>)}
        </div>
        <div>
          <label>Notes:</label>
          <input name='notes' value={notes} onChange={this.onChange} />
          {(errors.notes || []).map((e) => <div key={e}>{e}</div>)}
        </div>
        <div>
          <label>Amount:</label>
          <input name='amount' value={amount} type='number' onChange={this.onChange} />
          {(errors.amount || []).map((e) => <div key={e}>{e}</div>)}
        </div>
        <button onClick={this.onSubmit}>Add</button>
      </form>
    );
  }
}

export default NewExpense;
