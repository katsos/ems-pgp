import React from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVert from '@material-ui/icons/MoreVert';
import MoreHoriz from '@material-ui/icons/MoreHoriz';

class ActionMenu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  render() {
    const { anchorEl } = this.state;
    const { id, isHorizontal, actions, onAction } = this.props;

    return (
      <div>
        <IconButton
          variant='fab'
          aria-label='More'
          aria-owns={anchorEl ? id : null}
          aria-haspopup='true'
          onClick={e => this.setState({ anchorEl: e.target })}
        >
          {isHorizontal ? <MoreHoriz /> : <MoreVert />}
        </IconButton>
        <Menu
          id={id}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => this.setState({ anchorEl: null })}
        >
          {actions.map(({ name, label }) => (
            <MenuItem key={name} onClick={() => onAction(name)}>{label}</MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

ActionMenu.propTypes = {
  id: PropTypes.string,
  isHorizontal: PropTypes.bool,
  actions: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  onAction: PropTypes.func.isRequired,
};

ActionMenu.defaultProps = {
  id: '',
  isHorizontal: false,
};

export default ActionMenu;
