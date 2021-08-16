import React from "react";
import { FORM_CONTROLS } from "../../../pages/strings";

const CheckBoxGroup = (props) => {
  const formItemWrapperId = "to-be-defined";

  const hasError = () => {
    return props.errors && Boolean(props.errors[props.id]);
  };

  return (
    <div
      id={formItemWrapperId}
      className={"form-input form-item-checkbox-group"}
    >
      {hasError() && <div className="error-caption">{props.error}</div>}
      <div className="control">
        {props.label && (
          <label>
            {props.label}
            {props.isRequired && "*"}
          </label>
        )}
        <fieldset>
          <legend className="visually-hidden">
            {FORM_CONTROLS.CommunicationChannels}
          </legend>
          <div className="checkbox-wrapper">
            {props.opts.map(({ value, label }) => {
              return (
                <div key={value} className="checkbox-item">
                  <input
                    id={value}
                    name={props.id}
                    type="checkbox"
                    value={value}
                    {...props.refHook}
                  />{" "}
                  <label htmlFor={value}>{label}</label>
                </div>
              );
            })}
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default CheckBoxGroup;
