import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledInput = styled.input`
  border: none;
  border: solid #000 2px;
  border-radius: 0;
  text-align: center;
  border-radius: 30px;
  padding: 10px 0;

  :focus {
    box-shadow: none;
    border-color: #f00;
  }
`;

const StyledLable = styled.label`
  color: #777;
  text-transform: uppercase;
  font-weight: bold;
`;

const Input = (props) => {
  const { label, initialValue, onChange, disabled, required } = props;

  const handleChangeInput = (e) => {
    const re = /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/; //rules
    if (e.target.value === "" || re.test(e.target.value)) {
      onChange(e);
    }
  };

  return (
    <div className="form-group mb-3">
      <StyledLable className="control-label">{label}</StyledLable>
      <StyledInput
        type="text"
        className="form-control"
        value={initialValue}
        onChange={(e) => handleChangeInput(e)}
        required={required ? required : false}
        disabled={disabled}
      />
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  initialValue: PropTypes.any,
  onChange: PropTypes.func,
};

export default Input;
