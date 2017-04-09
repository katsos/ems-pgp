import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <header className="mdl-layout__header">
        <div className="mdl-layout__header-row">
          <div className="mdl-layout-spacer"/>
          <SearchInput id="header__search" />
        </div>
      </header>
    )
  }
}

class SearchInput extends React.Component {
  constructor(props) {
    super(props);

    this.name = 'header__search';
    this.state = {value: ''};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleIconClick = this.handleIconClick.bind(this);
  }

  handleInputChange(event) {
    const value = event.target.value;
    this.setState({value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.submit();
  }

  handleIconClick() {
    if (this.state.value.length) this.submit();
  }

  submit() {
    // TODO: something with value -- alert(this.state.value);
  }

  render() {
    return (
      <form className="mdl-textfield mdl-js-textfield mdl-textfield--align-right" onSubmit={this.handleSubmit}>
        <input className="mdl-textfield__input"
               type="text"
               name={this.name}
               id={this.name}
               value={this.state.value}
               onChange={this.handleInputChange}
        />
        <label className="mdl-button mdl-js-button mdl-button--icon" htmlFor={this.name} onClick={this.handleSubmit}>
          <i className="material-icons">search</i>
        </label>
      </form>
    )
  }
}
