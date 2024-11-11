import * as types from "./UserType";

export const userLoginReqITS = (values, successCallback) => {
  console.log("We are in user action req", values);
  return {
    type: types.LOGIN_ITS_REQ,
    payload: values,
    successCallback,
  };
};

export const userLoginRespITS = (value) => {
  console.log("we are in user action resp", value);
  return {
    type: types.LOGIN_ITS_RESP,
    payload: value,
  };
};

export const verifyTokenReq = (values, successCallback) => {
  console.log("We are in user action req" );
  return {
    type: types.VERIFY_TOKEN_REQ,
    payload: null,
    successCallback,
  };
};

export const verifyTokenRes = (value) => {
  console.log("we are in user action resp", value);
  return {
    type: types.VERIFY_TOKEN_RES,
    payload: value,
  };
};

