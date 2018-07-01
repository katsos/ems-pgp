import React from 'react';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreHoriz';

const MENU_ID = 'budget-actions';
const ACTIONS = [
  {
    name: 'expense',
    label: 'Νέο έξοδο',
  }, {
    name: 'edit',
    label: 'Επεξεργασία',
  },
];

class BudgetActions extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
    };
    this.onAction = this.onAction.bind(this);
  }

  onAction(action) {
    this.props.onSelect(action);
    this.setState({ anchorEl: null });
  }

  render() {
    const { anchorEl } = this.state;

    return (
      <React.Fragment>
        <IconButton
          aria-label='More'
          aria-owns={anchorEl ? MENU_ID : null}
          aria-haspopup='true'
          onClick={e => this.setState({ anchorEl: e.target })}
        >
          <MoreIcon />
        </IconButton>
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
      </React.Fragment>
    );
  }
}

export default BudgetActions;
