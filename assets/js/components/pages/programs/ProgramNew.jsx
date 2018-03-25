import React from 'react';
import Program from '../../../models/Program';

export default class ProgramNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      year: new Date().getFullYear(),
    };

    this._handleChange = this._handleChange.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  _handleChange({ target: { name, value }}) {
    this.setState({ [name]: value });
  }

  _handleFormSubmit(event) {
    event.preventDefault();
    // TODO: add modal to confirm that the addition was intentional

    Program.create(this.state)
      .then(({ id }) => this.props.history.push(`/programs/${id}`))
      .catch(console.error); // TODO: show a modal with the error
  }

  render() {
    return (
      <div>
        <form className="mdl-card" onSubmit={this._handleFormSubmit}>

          <div className="mdl-card__title">Add a new program</div>

          <div className="mdl-card__supporting-text">
            <input name="title" type="text" placeholder="title" value={this.state.title} onChange={this._handleChange} />
            <input name="year" type="number" placeholder="Year" min="1900" max="2050" value={this.state.year} onChange={this._handleChange} />
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
