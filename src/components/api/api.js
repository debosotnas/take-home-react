import { API_SUBSCRIBE_URL, RESPONSE_STATUS } from "../form/constants";
import {
  NetworkError,
  InvalidSubscriptionError,
  UnknownSubscriptionError,
} from "./Errors.js";
import { ERRORS } from "../../pages/strings";

const testFetchSuccess = true;
const testFetchDelay = 2000;

export const mockFetch = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        json: () =>
          testFetchSuccess
            ? {
                status: "success",
                message: "Thank you. You are now subscribed.",
              }
            : {
                status: "error",
                message: "Invalid Subscription request.",
              },
      });
    }, testFetchDelay);
  });
};

export const makeSignUp = async (payload) => {
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(payload),
  };
  return await mockFetch(API_SUBSCRIBE_URL, options);
};

export const submitSignUp = async (payload) => {
  const response = await makeSignUp(payload);
  if (response.status === 200) {
    const data = await response.json();
    if (data.status === RESPONSE_STATUS.SUCCESS) {
      return {
        msg: data.message,
      };
    } else if (data.status === RESPONSE_STATUS.ERROR) {
      throw new InvalidSubscriptionError(data.message);
    } else {
      throw new UnknownSubscriptionError(ERRORS.Unknown);
    }
  } else {
    throw new NetworkError(ERRORS.Network);
  }
};
