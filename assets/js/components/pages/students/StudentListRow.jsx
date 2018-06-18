import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Link from 'react-router-dom/Link';
import withRouter from 'react-router-dom/withRouter';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import StudentActionsMenu from './StudentActionsMenu';
import PaymentDialog from '../../PaymentDialog';
import Student from '../../../models/Student';

class StudentListRow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isPaymentDialogOpen: false,
    };
    this.onAction = this.onAction.bind(this);
  }

  onAction(action) {
    const studentId = this.props.student.id;
    switch (action) {
      case 'edit':
        return this.props.history.push(`/students/${studentId}/edit`);
      case 'delete':
        return Student.delete(studentId)
          .then(() => this.props.onDelete(studentId));
      case 'payment':
        this.setState({ isPaymentDialogOpen: true });
    }
  }

  render() {
    const { student } = this.props;
    const { isPaymentDialogOpen } = this.state;
    const fullname = `${student.surname} ${student.name}`;
    const totalPayments = student.payments.reduce((sum, { amount }) => sum + parseFloat(amount), 0);
    return (
      <TableRow key={student.id}>
        <TableCell>
          <Link to={`/students/${student.id}`}>{fullname}</Link>
        </TableCell>
        {!this.props.match.params.id && (
          <TableCell>
            <Link to={`/circles/${student.circle.id}`}>{student.circle.title}</Link>
          </TableCell>
        )}
        <TableCell numeric>{student.payments.length}</TableCell>
        <TableCell numeric>{totalPayments}</TableCell>
        <TableCell numeric>{student.circle.tuition - totalPayments}</TableCell>
        <TableCell numeric>{moment(student.created_at).format('L')}</TableCell>
        <TableCell>
          <StudentActionsMenu
            student={student}
            onSelect={this.onAction}
          />
          <PaymentDialog
            isOpen={isPaymentDialogOpen}
            student={student}
            onConfirm={payment => this.props.onAddPayment(student.id, payment)}
            onCancel={() => this.setState({ isPaymentDialogOpen: false })}
          />
        </TableCell>
      </TableRow>
    );
  }
}

StudentListRow.propTypes = {
  // TODO: add student validation
  onAddPayment: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

StudentListRow.defaultProps = {
  onDelete() {
    this.history.push('/circles');
  },
};

const StudentListRowWithRouter = withRouter(StudentListRow);
export default StudentListRowWithRouter;
