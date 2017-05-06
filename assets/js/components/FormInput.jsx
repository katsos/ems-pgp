import React from "react";
import PropTypes from 'prop-types';

function FormInput({id, type, pattern, placeholder})  {

  if (placeholder === null) placeholder = id.capitalize();

  return (
    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <input className="mdl-textfield__input" type={type} id={id} pattern={pattern}/>
      <label className="mdl-textfield__label" for={id}>{placeholder}</label>
    </div>
  )
}

FormInput.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  pattern: PropTypes.string,
  placeholder: PropTypes.string
};
FormInput.defaultProps = {
  type: 'text',
  pattern: null,
  placeholder: null
};

export default FormInput;
