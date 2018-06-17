import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Link from 'react-router-dom/Link';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import PaymentActions from './PaymentActions';

function PaymentList(props) {
  const payments = props.payments || props.student.payments;

  return (
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
        {payments.map((p) => {
          const student = p.student || props.student;
          const { circle } = student;

          return (
            <TableRow key={p.id}>
              <TableCell className='PaymentList__table__id'>{p.id}</TableCell>
              <TableCell>
                <Link to={`/students/${student.id}`}>{`${student.surname} ${student.name}`}</Link>
              </TableCell>
              <TableCell numeric>
                <Link to={`/circles/${circle.id}`}>{circle.title}</Link>
              </TableCell>
              <TableCell numeric>{p.amount}</TableCell>
              <TableCell numeric>{moment(p.created_at).format('L')}</TableCell>
              <TableCell><PaymentActions payment={p} afterAction={props.afterAction} /></TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

PaymentList.propTypes = {
  student({ payments, student }) {
    if (student || payments) return false;
    // TODO check student object
    return Error('Invalid pair of props. You should pass a `student` or a `payments` variable.');
  },
  payments({ payments, student }) {
    if (student || payments) return false;
    // TODO check payments array
    return Error('Invalid pair of props. You should pass a `student` or a `payments` variable.');
  },
  afterAction: PropTypes.func.isRequired,
};

export default PaymentList;
