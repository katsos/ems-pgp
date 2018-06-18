import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';

const MENU_ID = 'student-page-actions';
const ACTIONS = [
  {
    name: 'edit',
    label: 'Επεξεργασία',
  }, {
    name: 'delete',
    label: 'Διαγραφή',
  }, {
    name: 'payment',
    label: 'Νέο πληρωμή',
  },
];

class StudentPageActions extends React.PureComponent {
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
      <div>
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
      </div>
    );
  }
}

export default StudentPageActions;
