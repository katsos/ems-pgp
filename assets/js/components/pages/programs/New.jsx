import React from 'react';

import Http from '../../../Http';

import FormInput from '../../FormInput';
import {serializeForm} from "../../../utils";

export default class New extends React.Component {
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

    const formData = serializeForm(event.currentTarget);
    // Http.post('/programs/new', formData);
  }

  render() {
    return (
      <div>
        <form className="mdl-card" onSubmit={this._handleFormSubmit} >

          <div className="mdl-card__title">Add a new program</div>

          <div className="mdl-card__supporting-text">
            <FormInput id='title'
               onChange={this._handleChange}
            />
            <FormInput id='year'
              type='number'
              defaultValue={this.currentYear}
              onChange={this._handleChange}
            />
          </div>

         <div className="mdl-card__actions">
           <input type='reset' value='Reset'/>
           <input type='submit' value='Add'/>
         </div>

        </form>
      </div>
    )
  }
}
