import * as types from "./JamaatType";

export const approveRazaReq = (values, successCallback) => {
  console.log("We are in APPROVE_RAZA_REQ", values);
  return {
    type: types.APPROVE_RAZA_REQ,
    payload: values,
    successCallback,
  };
};

export const approveRazaRes = (value) => {
  console.log("we are in APPROVE_RAZA_RESP", value);
  return {
    type: types.APPROVE_RAZA_RESP,
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