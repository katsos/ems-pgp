import React from 'react';
import LoadingAnimation from '../../LoadingAnimation';
import Payment from '../../../models/Payment';

class List extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      payments: null,
    };
  }

  componentDidMount() {
    Payment.getAll()
      .then(payments => this.setState({ payments }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const { isLoading, payments } = this.state;

    if (isLoading) return <LoadingAnimation />;

    if (payments === null) return <h3>There was a problem while fetching payments.</h3>;

    if (payments.length === 0) return <h3>No payments have been done.</h3>;

    return (
      <div>
        <ul>
          {payments.map(({ id, amount }) => (
            <li key={id}>{amount}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default List;
