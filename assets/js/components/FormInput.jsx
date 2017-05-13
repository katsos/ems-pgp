import React from "react";
import PropTypes from 'prop-types';

function FormInput({id, type, defaultValue, pattern, hasAutofocus, isRequired, placeholder, onChange})  {

  if (placeholder === null) placeholder = id.capitalize();

  return (
    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <input
        className="mdl-textfield__input"
        type={type}
        id={id}
        name={id}
        defaultValue={defaultValue}
        autoFocus={hasAutofocus}
        required={isRequired}
        pattern={pattern}
        onChange={onChange}
      />
      <label className="mdl-textfield__label" for={id}>{placeholder}</label>
    </div>
  )
}

FormInput.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  hasAutofocus : PropTypes.bool,
  isRequired: PropTypes.bool,
  pattern: PropTypes.string,
  placeholder: PropTypes.string,
};
FormInput.defaultProps = {
  type: 'text',
  defaultValue: '',
  hasAutofocus: false,
  isRequired: false,
  pattern: null,
  placeholder: null
};

export default FormInput;