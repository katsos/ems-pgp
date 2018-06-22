import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreIcon from '@material-ui/icons/MoreHoriz';

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
            <MenuItem key={name} onClick={() => this.props.onAction(name)}>{label}</MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

PaymentActions.propTypes = {
  onAction: PropTypes.func.isRequired,
};

export default PaymentActions;
