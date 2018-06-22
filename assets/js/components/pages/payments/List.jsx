import React from 'react';
import Link from 'react-router-dom/Link';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import LoadingAnimation from '../../LoadingAnimation';
import Payment from '../../../models/Payment';
import PaymentList from '../../PaymentList';
import './List.scss';

class List extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      payments: null,
    };
    this.onAction = this.onAction.bind(this);
  }

  componentDidMount() {
    this.fetchPayments();
  }

  onAction(action, payment) {
    const { history } = this.props;

    switch (action) {
      case 'edit':
        return history.push(`/payments/${payment.id}/edit`);
      case 'delete':
        Payment.delete(payment.id)
          .then(() => this.fetchPayments());
    }
  }

  fetchPayments() {
    this.setState({ isLoading: true });
    Payment.getAll()
      .then(payments => this.setState({ payments }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const { isLoading, payments } = this.state;

    if (isLoading) return <LoadingAnimation />;

    if (payments === null) return <h3>There was a problem while fetching payments.</h3>;

    return (
      <div className='PaymentList'>
        <div className='PaymentList__header'>
          <h3>ΠΛΗΡΩΜΕΣ</h3>
          <Link to='/payments/new'>
            <Button variant='fab' color='primary' aria-label='add'><AddIcon /></Button>
          </Link>
        </div>
        {payments.length === 0 ? (
          <p>Δεν έχει καταχωρηθει καμία πληρωμή εώς τώρα.<br />
            Πατήστε το κουμπί δεξιά για να εισάγετε νέα.
          </p>
        ) : (
          <PaymentList payments={payments} afterAction={this.onAction} />
        )}
      </div>
    );
  }
}

export default List;
