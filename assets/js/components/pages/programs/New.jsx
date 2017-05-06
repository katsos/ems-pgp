import React from 'react';

import Http from '../../../Http';

import FormInput from '../../FormInput';
import {serializeForm} from "../../../utils";

export default class New extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

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
      <div className="programs-new">
        <h3>Add a new program</h3>

        <form onSubmit={this._handleFormSubmit}>
          <FormInput id='title'/>
        </form>

      </div>
    )
  }
}
