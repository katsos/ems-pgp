import React from 'react';
import moment from 'moment';
import Link from 'react-router-dom/Link';
import { Button, Table, TableHead, TableCell, TableRow, TableBody, withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ListActionsButton from './ListActionsButton';
import LoadingAnimation from '../../LoadingAnimation';
import Payment from '../../../models/Payment';
import './List.scss';

class List extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      payments: null,
    };
    this.fetchPayments = this.fetchPayments.bind(this);
  }

  componentDidMount() {
    this.fetchPayments();
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

    if (payments.length === 0) return <h3>No payments have been done.</h3>;

    return (
      <div className='PaymentList'>
        <div className='PaymentList__header'>
          <h3>ΠΛΗΡΩΜΕΣ</h3>
          <Link to='/payments/new'>
            <Button variant='fab' color='primary' aria-label='add'><AddIcon /></Button>
          </Link>
        </div>
        <Table className='PaymentList__table'>
          <TableHead>
            <TableRow>
              <TableCell className='PaymentList__table__id'>ΑΜΣ</TableCell>
              <TableCell>ΟΝΟΜΑΤΕΠΩΝΥΜΟ</TableCell>
              <TableCell numeric>ΚΥΚΛΟΣ</TableCell>
              <TableCell numeric>ΠΟΣΟ</TableCell>
              <TableCell numeric>ΗΜΕΡΟΜΗΝΙΑ ΚΑΤΑΧΩΡΗΣΗΣ</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map(p => (
              <TableRow key={p.id}>
                <TableCell className='PaymentList__table__id'>{p.id}</TableCell>
                <TableCell>{`${p.student.surname} ${p.student.name}`}</TableCell>
                <TableCell numeric>{p.student.circle}</TableCell>
                <TableCell numeric>{p.amount}</TableCell>
                <TableCell numeric>{moment(p.created_at).format('L')}</TableCell>
                <TableCell><ListActionsButton payment={p} afterAction={this.fetchPayments} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

const ListWithStyles = withStyles()(List);
export default ListWithStyles;
