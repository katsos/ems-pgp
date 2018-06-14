import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Checkbox, Dialog, DialogTitle, TextField,
  FormControl, FormControlLabel, Input, InputLabel, InputAdornment
} from '@material-ui/core';
import { Expense } from '../../../../models';
import './ExpenseDialog.scss';

class ExpenseDialog extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      type: '',
      amount: '',
      notes: '',
      is_completed: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  onSubmit() {
    const { id: budget_field } = this.props.field;
    Expense.create({ ...this.state, budget_field })
      // TODO: inform for the successful POST
      .then(this.props.onCancel);
      // TODO: catch
  }

  render() {
    const { isOpen, field, onCancel } = this.props;
    const { type, amount, notes, is_completed: isCompleted } = this.state;

    // TODO: show form errors
    return (
      <Dialog open={isOpen} className='ExpenseDialog'>
        <DialogTitle className='ExpenseDialog__title'>
          Νέo έξοδο
          <p>{`${field.code} ${field.title}`}</p>
        </DialogTitle>
        <form className='ExpenseDialog__form'>
          <TextField name='type' value={type} onChange={this.onChange} label='Περιγραφή' />

          <FormControl>
            <InputLabel htmlFor='amount'>Ποσό</InputLabel>
            <Input
              id='amount'
              type='number'
              name='amount'
              value={amount}
              onChange={this.onChange}
              className='ExpenseDialog__form__amount'
              endAdornment={<InputAdornment position='end'>&euro;</InputAdornment>}
            />
          </FormControl>

          <FormControlLabel
            control={
              <Checkbox
                name='is_completed'
                checked={isCompleted}
                onChange={() => this.setState({ is_completed: !isCompleted })}
              />
            }
            label='ΟΛΟΚΛΗΡΩΜΕΝΗ'
          />

          <TextField
            name='notes'
            value={notes}
            onChange={this.onChange}
            label='Σχόλια'
            multiline
            rowsMax='3'
          />

          <div className='ExpenseDialog__form__buttons'>
            <Button variant='contained' color='primary' onClick={this.onSubmit}>ΥΠΟΒΟΛΗ</Button>
            <Button color='secondary' onClick={onCancel}>ΑΚΥΡΩΣΗ</Button>
          </div>
        </form>
      </Dialog>
    );
  }
}


ExpenseDialog.propTypes = {
  field: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ExpenseDialog;
