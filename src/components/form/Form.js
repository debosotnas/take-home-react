import React, { useState } from "react";
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
  FORM_SUBMISSION_STATE,
} from "./constants";
import { CTAS, TITLES } from "../../pages/strings";
import { submitSignUp } from "../api/api";
import { NetworkError, InvalidSubscriptionError } from "../api/Errors";

const Form = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionState, setSubmissionState] = useState(
    FORM_SUBMISSION_STATE.NOT_SENT
  );
  const [apiResultMessage, setApiResultMessage] = useState();

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    if (isSubmitting) {
      return;
    }
    setSubmissionState(FORM_SUBMISSION_STATE.NOT_SENT);

    try {
      setIsSubmitting(true);
      const { channels, ...rest } = formData;
      const payload = {
        ...rest,
        ...channels
          .map((c) => ({ [c]: true }))
          .reduce((prev, curr) => ({ ...prev, ...curr }), {}),
      };
      console.log(payload);
      setSubmissionState(FORM_SUBMISSION_STATE.LOADING);
      const data = await submitSignUp(payload);
      setApiResultMessage(data.msg);
      setSubmissionState(FORM_SUBMISSION_STATE.SUCCESS);
    } catch (e) {
      if (e instanceof NetworkError) {
        setSubmissionState(FORM_SUBMISSION_STATE.ERROR);
        setApiResultMessage(e.message);
      } else if (e instanceof InvalidSubscriptionError) {
        setSubmissionState(FORM_SUBMISSION_STATE.ERROR);
        setApiResultMessage(e.message);
      } else {
        setSubmissionState(FORM_SUBMISSION_STATE.ERROR);
        setApiResultMessage(e.message);
      }
    } finally {
      setIsSubmitting(false);
    }
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
      {(submissionState === FORM_SUBMISSION_STATE.ERROR ||
        submissionState === FORM_SUBMISSION_STATE.SUCCESS) && (
        <div id="formControlsMsg" className={submissionState}>
          {apiResultMessage}
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className={submissionState}
      >
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
          <button
            type="submit"
            aria-label="Submit"
            className={isSubmitting ? "loading-basic" : ""}
          >
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
