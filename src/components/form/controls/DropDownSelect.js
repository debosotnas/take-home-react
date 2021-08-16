import React from "react";
import { FORM_CONTROLS } from "../../../pages/strings";

const DropDownSelect = (props) => {
  const hasError = () => {
    return props.errors && Boolean(props.errors[props.id]);
  };

  return (
    <div className={"form-input form-item-dropdown"}>
      {hasError() && <div className="error-caption">{props.error}</div>}
      <div className="control">
        <label htmlFor={props.id}>
          {props.label}
          {props.isRequired && "*"}
        </label>
        <select id={props.id} name={props.id} {...props.refHook}>
          <option value="">{FORM_CONTROLS.SelectOne}</option>
          {Array.isArray(props.opts) &&
            props.opts.map(({ value, label }) => {
              return (
                <option key={value} value={value}>
                  {label}
                </option>
              );
            })}
        </select>
      </div>
    </div>
  );
};

export default DropDownSelect;
