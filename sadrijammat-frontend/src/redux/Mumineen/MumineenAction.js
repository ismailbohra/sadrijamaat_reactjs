import * as types from "./MumineenType";

export const applyRazaReq = (values, successCallback) => {
  console.log("We are in APPLY_RAZA_REQ", values);
  return {
    type: types.APPLY_RAZA_REQ,
    payload: values,
    successCallback,
  };
};

export const applyRazaRes = (value) => {
  console.log("we are in APPLY_RAZA_RESP", value);
  return {
    type: types.APPLY_RAZA_RESP,
    payload: value,
  };
};
export const getRazaTypeReq = (values, successCallback) => {
  console.log("We are in GET_RAZA_TYPE_REQ", values);
  return {
    type: types.GET_RAZA_TYPE_REQ,
    payload: values,
    successCallback,
  };
};

export const getRazaTypeRes = (value) => {
  console.log("we are in GET_RAZA_TYPE_RESP", value);
  return {
    type: types.GET_RAZA_TYPE_RESP,
    payload: value,
  };
};
export const getAllRazaReq = (values, successCallback) => {
  console.log("We are in GET_ALL_RAZA_REQ", values);
  return {
    type: types.GET_ALL_RAZA_REQ,
    payload: values,
    successCallback,
  };
};

export const getAllRazaRes = (value) => {
  console.log("we are in GET_ALL_RAZA_RES", value);
  return {
    type: types.GET_ALL_RAZA_RESP,
    payload: value,
  };
};

export const getMumineenByIdReq = (values, successCallback) => {
  console.log("We are in GET_MUMINEEN_BY_ID_REQ", values);
  return {
    type: types.GET_MUMINEEN_BY_ID_REQ,
    payload: values,
    successCallback,
  };
};

export const getMumineenByIdResp = (value) => {
  console.log("we are in GET_MUMINEEN_BY_ID_RESP", value);
  return {
    type: types.GET_MUMINEEN_BY_ID_RESP,
    payload: value,
  };
};

export const updateRazaReq = (values, successCallback) => {
  console.log("We are in UPDATE_RAZA_REQ", values);
  return {
    type: types.UPDATE_RAZA_REQ,
    payload: values,
    successCallback,
  };
};

export const updateRazaResp = (value) => {
  console.log("we are in UPDATE_RAZA_RESP", value);
  return {
    type: types.UPDATE_RAZA_RESP,
    payload: value,
  };
};

export const deleteRazaReq = (values, successCallback) => {
  console.log("We are in DELETE_RAZA_REQ", values);
  return {
    type: types.DELETE_RAZA_REQ,
    payload: values,
    successCallback,
  };
};
export const deleteRazaResp = (values, successCallback) => {
  console.log("We are in DELETE_RAZA_REsp", values);
  return {
    type: types.DELETE_RAZA_RESP,
    payload: values,
    successCallback,
  };
};