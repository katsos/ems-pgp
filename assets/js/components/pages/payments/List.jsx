import React from 'react';
import Link from 'react-router-dom/Link';
import { Button, Table, TableHead, TableCell, TableRow, TableBody, withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
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
  }

  componentDidMount() {
    Payment.getAll()
      .then(payments => this.setState({ payments }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const { classes } = this.props;
    const { isLoading, payments } = this.state;

    if (isLoading) return <LoadingAnimation />;

    if (payments === null) return <h3>There was a problem while fetching payments.</h3>;

    if (payments.length === 0) return <h3>No payments have been done.</h3>;

    return (
      <div className='PaymentList'>
        <div className='PaymentList__header'>
          <h3>ΠΛΗΡΩΜΕΣ</h3>
          <Button variant='fab' color='primary' aria-label='add' className={classes.button}>
            <Link to='/payments/new'><AddIcon /></Link>
          </Button>
        </div>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>ΑΜΣ</TableCell>
              <TableCell>ΟΝΟΜΑΤΕΠΩΝΥΜΟ</TableCell>
              <TableCell numeric>ΠΟΣΟ</TableCell>
              <TableCell>ΗΜΕΡΟΜΗΝΙΑ ΚΑΤΑΧΩΡΗΣΗΣ</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map(p => (
              <TableRow key={p.id}>
                <TableCell>{p.id}</TableCell>
                <TableCell>TODO</TableCell>
                <TableCell numeric>{p.amount}</TableCell>
                <TableCell>TODO</TableCell>
                <TableCell>TODO: actions</TableCell>
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
