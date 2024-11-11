import * as ACTIONS from "./JamaatAction";
import * as TYPES from "./JamaatType";
import * as API from "./JamaatApi";
import { call, put, takeLatest, all } from "redux-saga/effects";
import {
  dispatchToasterError,
  dispatchToasterSuccess,
} from "../../utils/Shared";

export function* getRazaType(action) {
  console.log("Jamaat Saga", action);
  try {
    const response = yield call(API.getRazaType, action.payload);
    yield console.log("get raza type jamaat saga", response);
    if (action.successCallback) {
      yield call(action.successCallback);
    }
    yield put(ACTIONS.getRazaTypeRes(response));
  } catch (err) {
    console.log(err)
    if (err?.response?.data?.message) {
      dispatchToasterError(err?.response?.data?.message);
    } else {
      dispatchToasterError("internalServerError");
    }
  }
}
export function* approveRazaReq(action) {
  console.log("Jamaat Saga", action);
  try {
    const response = yield call(API.approveRaza, action.payload);
    yield console.log("get raza type jamaat saga", response);
    dispatchToasterSuccess("Approve Successfully");
    if (action.successCallback) {
      yield call(action.successCallback);
    }
  } catch (err) {
    console.log(err)
    if (err?.response?.data?.message) {
      dispatchToasterError(err?.response?.data?.message);
    } else {
      dispatchToasterError("internalServerError");
    }
  }
}

export function* getAllRaza(action) {
  console.log("Jamaat Saga", action);
  try {
    const response = yield call(API.getAllRaza);
    yield console.log("getAllRaza jamaat saga", response);
    if (action.successCallback) {
      yield call(action.successCallback);
    }
    yield put(ACTIONS.getAllRazaRes(response));
  } catch (err) {
    console.log(err)
    if (err?.response?.data?.message) {
      dispatchToasterError(err?.response?.data?.message);
    } else {
      dispatchToasterError("internalServerError");
    }
  }
}
export function* getMumineenById(action) {
  console.log("Jamaat Saga", action);
  try {
    const response = yield call(API.getMumineenById,action.payload);
    yield console.log("getMumineenById jamaat saga", response);
    if (action.successCallback) {
      yield call(action.successCallback);
    }
    yield put(ACTIONS.getMumineenByIdResp(response));
  } catch (err) {
    console.log(err)
    if (err?.response?.data?.message) {
      dispatchToasterError(err?.response?.data?.message);
    } else {
      dispatchToasterError("internalServerError");
    }
  }
}
export function* deleteRazaReq(action) {
  console.log("Jamaat Saga", action);
  try {
    const response = yield call(API.deleteRaza,action.payload);
    yield console.log("deleteRazaReq jamaat saga", response);
    if (action.successCallback) {
      yield call(action.successCallback);
    }
    yield put(ACTIONS.deleteRazaResp(action.payload));
    dispatchToasterSuccess("Deleted Successfully");
  } catch (err) {
    console.log(err)
    if (err?.response?.data?.message) {
      dispatchToasterError(err?.response?.data?.message);
    } else {
      dispatchToasterError("internalServerError");
    }
  }
}

export function* MumineenSagas() {
  yield all([takeLatest(TYPES.GET_RAZA_TYPE_REQ, getRazaType)]);
  yield all([takeLatest(TYPES.APPLY_RAZA_REQ, applyRazaReq)]);
  yield all([takeLatest(TYPES.GET_ALL_RAZA_REQ, getAllRaza)]);
  yield all([takeLatest(TYPES.GET_MUMINEEN_BY_ID_REQ, getMumineenById)]);
  yield all([takeLatest(TYPES.UPDATE_RAZA_REQ, updateRazaReq)]);
  yield all([takeLatest(TYPES.DELETE_RAZA_REQ, deleteRazaReq)]);
}
