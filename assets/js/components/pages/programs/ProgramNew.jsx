import React from 'react';

import Http from '../../../Http';

import FormInput from '../../FormInput';
import {serializeForm} from "../../../utils";

export default class ProgramNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.currentYear = new Date().getFullYear();

    this._handleChange = this._handleChange.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  _handleChange(event) {
    this.setState({value: event.target.value});
  }

  _handleFormSubmit(event) {
    event.preventDefault();

    // TODO: add modal to confirm that the addition was intentional

    const formData = serializeForm(event.currentTarget);
    Http.post('/api/programs', formData)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        // TODO: navigate to new programs' page
      })
      .catch(response => {
        alert(response);
      })
  }

  render() {
    return (
      <div>
        <form className="mdl-card" onSubmit={this._handleFormSubmit}>

          <div className="mdl-card__title">Add a new program</div>

          <div className="mdl-card__supporting-text">
            <FormInput id='title'
                       hasAutofocus
                       isRequired
                       onChange={this._handleChange}
            />
            <FormInput id='year'
                       type='number'
                       defaultValue={this.currentYear}
                       onChange={this._handleChange}
            />
          </div>

          <div className="mdl-card__actions mdl-card__actions--right">
            <input type='submit'
                   className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                   value='Add'
            />
            <input type='reset'
                   className="mdl-button mdl-js-button mdl-button--accent"
                   value='Reset'
            />
          </div>

        </form>
      </div>
    )
  }
}
