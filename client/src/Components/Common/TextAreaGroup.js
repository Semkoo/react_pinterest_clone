import React from "react";
import classname from "classname";
import propTypes from "prop-types";

const TextAreaGroup = ({
  name,
  placeholder,
  value,
  label,
  info,
  onChange,
  error
}) => {
  return (
    <div className="form-group">
      <textarea
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextAreaGroup.propTypes = {
  name: propTypes.string.isRequired,
  placeholder: propTypes.string,
  value: propTypes.string.isRequired,
  info: propTypes.string,
  error: propTypes.string,
  onChange: propTypes.func.isRequired
};

export default TextAreaGroup;
