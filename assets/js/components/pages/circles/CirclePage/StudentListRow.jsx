import React from 'react';
import { withRouter } from 'react-router'
import { IconButton, Menu, MenuItem } from '@material-ui/core';
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

    this.state = {
      anchorEl: null,
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
      case 'edit':
      case 'delete':
    }
  }

  render() {
    const { anchorEl } = this.state;
    const { id, name, surname } = this.props.student;

    return (
      <tr key={id}>
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
    );
  }
}

const StudentListRowWithRouter = withRouter(StudentListRow);
export default StudentListRowWithRouter;
