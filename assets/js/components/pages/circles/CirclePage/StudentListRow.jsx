import React from 'react';
import { withRouter } from 'react-router';
import { Button, Dialog, DialogTitle, IconButton, Menu, MenuItem, withStyles } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreHoriz';

const ACTIONS = [
  {
    name: 'profile',
    label: 'Προφίλ',
  }, {
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

class StudentListRow extends React.PureComponent {
  constructor(props) {
    super(props);

    this.cycleId = this.props.match.params.id;
    this.state = {
      anchorEl: null,
      isPaymentDialogOpen: false,
      paymentAmount: 0,
    };
    this.onCloseMenu = this.onCloseMenu.bind(this);
    this.onClickMenuButton = this.onClickMenuButton.bind(this);
  }

  onClickMenuButton({ currentTarget }) {
    this.setState({ anchorEl: currentTarget });
  };

  onCloseMenu() {
    this.setState({ anchorEl: null });
  };

  onSelectAction(action, studentId) {
    switch (action) {
      case 'profile':
        return this.props.history.push(`/students/${studentId}`);
      case 'payment':
        return this.setState({ isPaymentDialogOpen: true, anchorEl: null });
      case 'edit':
      case 'delete':
    }
  }

  render() {
    const { anchorEl, isPaymentDialogOpen, paymentAmount } = this.state;
    const { classes, student: { id, name, surname } } = this.props;

    return (
      <React.Fragment>
        <tr>
          <td>{surname}</td>
          <td>{name}</td>
          <td>
            <IconButton
              aria-label='More'
              aria-owns={anchorEl ? 'more-actions' : null}
              aria-haspopup='true'
              onClick={this.onClickMenuButton}
            >
              <MoreIcon />
            </IconButton>
            <Menu
              id='more-actions'
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.onCloseMenu}
            >
              {ACTIONS.map(({ name, label }) => (
                <MenuItem key={name} onClick={() => this.onSelectAction(name, id)}>{label}</MenuItem>
              ))}
            </Menu>
          </td>
        </tr>
        <Dialog open={isPaymentDialogOpen}>
          <DialogTitle id="simple-dialog-title">Νέα πληρωμή</DialogTitle>
          <table>
            <tbody>
              <tr><td>Φοιτητής:</td><td>{`${surname} ${name} (#${id})`}</td></tr>
              <tr><td>Κύκλος:</td><td>#{this.cycleId}</td></tr>
              <tr>
                <td>Ποσό:</td>
                <td>
                  <input
                    name='payment_amount'
                    value={paymentAmount}
                    type='number'
                    onChange={e => this.setState({ paymentAmount: e.target.value })}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <Button
              color='secondary'
              className={classes.button}
              onClick={() => this.setState({ isPaymentDialogOpen: false })}
            >ΑΚΥΡΩΣΗ</Button>
            <Button color='primary' className={classes.button}>ΕΠΙΒΕΒΑΙΩΣΗ</Button>
          </div>
        </Dialog>
      </React.Fragment>
    );
  }
}

const StudentListRowWithStyles = withStyles()(StudentListRow);
const StudentListRowWithRouter = withRouter(StudentListRowWithStyles);
export default StudentListRowWithRouter;
