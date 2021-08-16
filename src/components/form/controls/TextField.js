import React from "react";

const TextField = (props) => {
  const hasError = () => {
    return props.errors && Boolean(props.errors[props.id]);
  };

  return (
    <div
      className={
        hasError() ? ["form-input form-item error"] : ["form-input form-item"]
      }
    >
      <div className="error-caption">{props.error}</div>
      <div className="control">
        <label htmlFor={props.id}>
          {props.label}
          {props.isRequired && "*"}
        </label>
        <input
          type={props.type}
          name={props.id}
          id={props.id}
          {...props.refHook}
        />
      </div>
    </div>
  );
};

export default TextField;
