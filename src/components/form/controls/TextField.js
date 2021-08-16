import React from "react";
import { isValidEmail } from "../helpers";

const TextField = (props) => {
  const hasError = () => {
    return props.errors && Boolean(props.errors[props.id]);
  };
  return (
    <div className={"form-input form-item"}>
      {hasError() && <div className="error-caption">{props.error}</div>}
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
