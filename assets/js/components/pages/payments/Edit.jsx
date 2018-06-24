import React from 'react';
import { Payment } from '../../../models';
import LoadingAnimation from '../../LoadingAnimation';
import PaymentForm from './PaymentForm';

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

    const { payment } = this.state;
    return (
      <PaymentForm
        payment={payment}
        onChange={this.onChange}
        onConfirm={this.onConfirm}
        onCancel={this.props.history.goBack}
      />
    );
  }
}

export default Edit;
