import React from "react";
import "./Form.sass";
import { useForm } from "react-hook-form";
import TextField from "./controls/TextField";
import DropDownSelect from "./controls/DropDownSelect";
import CheckBoxGroup from "./controls/CheckBoxGroup";
import {
  CONTROLS,
  FORM_CONTROL_TYPES,
  VALIDATION_TYPE,
  REG_EMAIL_VALIDATOR,
} from "./constants";
import { CTAS, TITLES } from "../../pages/strings";

const Form = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(" >>> data: ", data);
  };

  const getValidator = (isRequired, validation) => {
    const emailValidator =
      validation === VALIDATION_TYPE.EMAIL
        ? {
            pattern: {
              value: REG_EMAIL_VALIDATOR,
            },
          }
        : {};
    return isRequired
      ? { required: "Required", ...emailValidator }
      : { ...emailValidator };
  };

  return (
    <div className="form-wrapper">
      <div id="formControlsMsg" className=""></div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <p>{TITLES.RequiredField}</p>
        <div className="form-controls">
          {CONTROLS.map((control) => {
            switch (control.type) {
              case FORM_CONTROL_TYPES.TEXT_INPUT:
                return (
                  <TextField
                    key={control.id}
                    id={control.id}
                    type="text"
                    error={control.error}
                    label={control.label}
                    isRequired={control.isRequired}
                    refHook={register(
                      control.id,
                      getValidator(control.isRequired, control.validation)
                    )}
                    errors={errors}
                  />
                );
              case FORM_CONTROL_TYPES.DROPDOWN_SELECT:
                return (
                  <DropDownSelect
                    key={control.id}
                    id={control.id}
                    error={control.error}
                    label={control.label}
                    isRequired={control.isRequired}
                    opts={control.options}
                    refHook={register(
                      control.id,
                      getValidator(control.isRequired)
                    )}
                    errors={errors}
                  />
                );
              case FORM_CONTROL_TYPES.CHECKBOX_GROUP:
                return (
                  <CheckBoxGroup
                    key={control.id}
                    id={control.id}
                    error={control.error}
                    label={control.label}
                    isRequired={control.isRequired}
                    opts={control.options}
                    refHook={register(
                      control.id,
                      getValidator(control.isRequired)
                    )}
                    errors={errors}
                  />
                );
              default:
                return null;
            }
          })}
        </div>

        <div className="form-buttons">
          <button type="submit" aria-label="Submit">
            <span className="label">{CTAS.Submit}</span>
          </button>
          <button
            type="reset"
            onClick={() => {
              clearErrors();
            }}
          >
            {CTAS.Reset}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
