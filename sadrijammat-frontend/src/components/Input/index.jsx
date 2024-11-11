import PropTypes from 'prop-types';
import React from 'react';
import { Form } from 'react-bootstrap';
import './Input.scss';

const Input = ({
  as,
  id,
  name,
  icon,
  style,
  error,
  label,
  value,
  disabled,
  onBlur,
  onReset,
  onClick,
  readOnly,
  inputRef,
  onChange,
  inputType,
  className,
  onKeyDown,
  helperText,
  inputClass,
  errorClass,
  placeholder,
  defaultValue,
}) => {
  return (
    <Form.Group
      className={`form-group ${className}`}
      style={style}
      controlId={id}
      as={as}
    >
      {/* {icon ? <i className={`${icon}`} /> : null} */}

      <Form.Control
        type={inputType}
        placeholder={placeholder}
        className={icon ? `text-indent ${inputClass}` : `${inputClass}`}
        onChange={(e) => onChange(e)}
        name={name}
        onBlur={onBlur}
        value={value}
        disabled={disabled}
        onReset={onReset}
        defaultValue={defaultValue}
        autoComplete={'off'}
        onKeyDown={onKeyDown}
        onClick={onClick}
        ref={inputRef}
        readOnly={readOnly}
      />
      {helperText ? (
        <Form.Text className="helper-text">{helperText}</Form.Text>
      ) : null}
      {error ? (
        <div
          className={
            errorClass ? `error-message ${errorClass}` : 'error-message'
          }
        >
          {error}
        </div>
      ) : null}
    </Form.Group>
  );
};

Input.propTypes = {
  as: PropTypes.object,
  id: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  icon: PropTypes.string,
  inputRef: PropTypes.any,
  onClick: PropTypes.func,
  label: PropTypes.string,
  error: PropTypes.string,
  style: PropTypes.object,
  value: PropTypes.any,
  disabled: PropTypes.any,
  onReset: PropTypes.func,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.any,
  readOnly: PropTypes.bool,
  inputType: PropTypes.string,
  className: PropTypes.string,
  helperText: PropTypes.string,
  inputClass: PropTypes.string,
  errorClass: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
};



export default Input;
