import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <header className="mdl-layout__header">
        <div className="mdl-layout__header-row">
          <div className="mdl-layout-spacer"/>
          {/*<SearchInput id="header__search" />*/}
        </div>
      </header>
    );
  }
}

class SearchInput extends React.Component {
  constructor(props) {
    super(props);

    this.name = 'header__search';
    this.state = {value: ''};

    this.addEventListener_Ctrl_S();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleIconClick = this.handleIconClick.bind(this);
  }

  componentDidMount() {
    this.inputElement = document.body.querySelector(`#${this.name}`);
  }

  addEventListener_Ctrl_S() {
    /* don't add listener if we don't know the platform */
    if (!navigator.platform) return;

    document.addEventListener('keydown', event => {
      if (((navigator.platform.startsWith('Mac') && event.metaKey) || event.ctrlKey) && event.keyCode === 83) {
        event.preventDefault();
        this.inputElement.focus();
      }
    });
  }

  handleInputChange(event) {
    const value = event.target.value;
    this.setState({value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.submit();
  }

  /**
   * If input is not empty submit query and return focus to the input field whatever its value is.
   */
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
        <label className="mdl-button mdl-js-button mdl-button--icon" htmlFor={this.name} onClick={this.handleIconClick}>
          <i className="material-icons">search</i>
        </label>
      </form>
    )
  }
}
