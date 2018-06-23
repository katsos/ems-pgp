import React from 'react';
import Button from '@material-ui/core/Button';
import { Payment } from '../../../models';
import LoadingAnimation from '../../LoadingAnimation';
import './PaymentForm.scss';

class Edit extends React.Component {
  constructor(props) {
    super(props);

    this.paymentId = this.props.match.params.id;
    this.state = {
      isLoading: true,
      payment: null,
    };
    this.onChange = this.onChange.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  componentDidMount() {
    Payment.get(this.paymentId)
      .then(payment => this.setState({ payment }))
      .finally(() => this.setState({ isLoading: false }));
  }

  onChange({ target: { name, value } }) {
    const payment = Object.assign(this.state.payment, { [name]: value });
    this.setState({ payment });
  }

  onConfirm() {
    this.setState({ isLoading: true });
    const { amount, notes } = this.state.payment;

    Payment.update(this.paymentId, { amount, notes })
      .then(() => this.props.history.push('/payments'));
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading) return <LoadingAnimation />;
    const { payment: { amount, notes, student } } = this.state;

    return (
      <form className='PaymentForm'>
        <table>
          <tbody>
          <tr>
            <td>Φοιτητής:</td>
            <td>{`${student.surname} ${student.name} (#${student.id})`}</td>
          </tr>
          <tr>
            <td>Κύκλος:</td>
            <td>#{student.circle.id}</td>
          </tr>
          <tr>
            <td>Ποσό:</td>
            <td><input name='amount' value={amount} type='number' onChange={this.onChange}/></td>
          </tr>
          <tr>
            <td>Σχόλια:</td>
            <td><input name='notes' value={notes} onChange={this.onChange} /></td>
          </tr>
          </tbody>
        </table>
        <div className='PaymentForm__buttons'>
          <Button color='primary' onClick={this.onConfirm}>ΕΠΙΒΕΒΑΙΩΣΗ</Button>
        </div>
      </form>
    );
  }
}

export default Edit;
