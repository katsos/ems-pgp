import React from 'react';
import PropTypes from 'prop-types';
import withRouter from 'react-router-dom/withRouter';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton';
import { Student } from '../../../models';
import PaymentDialog from '../../PaymentDialog';

const ACTIONS = [
  {
    name: 'payment',
    label: 'Νέα πληρωμή',
  }, {
    name: 'edit',
    label: 'Επεξεργασία',
  }, {
    name: 'delete',
    label: 'Διαγραφή',
  },
];

class StudentListActions extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      isPaymentDialogOpen: false,
    };
    this.onPayment = this.onPayment.bind(this);
  }


  onAction(action) { /* eslint consistent-return: "off" */
    const studentId = this.props.student.id;

    switch (action) {
      case 'payment':
        return this.setState({ isPaymentDialogOpen: true, anchorEl: null });
      case 'delete':
        return Student.delete(studentId)
          .then(() => this.props.onDelete(studentId)); // TODO: catch
      case 'edit':
        return this.props.history.push({
          pathname: `/students/${studentId}`,
          state: {
            editMode: true,
          },
        });
    }
  }

  onPayment(payment) {
    const studentId = this.props.student.id;
    this.props.onPayment(studentId, payment);
    this.setState({ isPaymentDialogOpen: false });
  }

  render() {
    const { student } = this.props;
    const { anchorEl, isPaymentDialogOpen } = this.state;
    return (
      <div>
        <IconButton
          aria-label='More'
          aria-owns={anchorEl ? 'more-actions' : null}
          aria-haspopup='true'
          onClick={e => this.setState({ anchorEl: e.target })}
        >
          <MoreIcon />
        </IconButton>
        <Menu
          id='more-actions'
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => this.setState({ anchorEl: null })}
        >
          {ACTIONS.map(({ name, label }) => (
            <MenuItem key={name} onClick={() => this.onAction(name)}>{label}</MenuItem>
          ))}
        </Menu>

        <PaymentDialog
          student={student}
          isOpen={isPaymentDialogOpen}
          onConfirm={this.onPayment}
          onCancel={() => this.setState({ isPaymentDialogOpen: false })}
        />
      </div>
    );
  }
}

StudentListActions.propTypes = {
  student: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onPayment: PropTypes.func.isRequired,
};

const StudentListActionsWithRouter = withRouter(StudentListActions);
export default StudentListActionsWithRouter;
