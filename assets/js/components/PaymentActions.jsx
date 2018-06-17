import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Button, Menu, MenuItem } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import { Payment } from '../models/index';

const MENU_ID = 'payment-actions';
const ACTIONS = [
  {
    name: 'edit',
    label: 'Επεξεργασία',
  }, {
    name: 'delete',
    label: 'Διαγραφή',
  },
];

class PaymentActions extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  onAction(action) {
    const { afterAction, payment } = this.props;
    const paymentId = payment.id;
    if (action === 'delete') {
      return Payment.delete(paymentId)
        .then(afterAction);
    }
    this.props.history.push(`/payments/${paymentId}/edit`, { payment });
  }

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <Button
          aria-label='More'
          aria-owns={anchorEl ? MENU_ID : null}
          aria-haspopup='true'
          onClick={e => this.setState({ anchorEl: e.target })}
        >
          <MoreIcon />
        </Button>
        <Menu
          id={MENU_ID}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => this.setState({ anchorEl: null })}
        >
          {ACTIONS.map(({ name, label }) => (
            <MenuItem key={name} onClick={() => this.onAction(name)}>{label}</MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

PaymentActions.propTypes = {
  afterAction: PropTypes.func.isRequired,
  payment: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

const ListActionsButtonWithRouter = withRouter(PaymentActions);
export default ListActionsButtonWithRouter;
