import * as ACTIONS from "./UserAction";
import * as TYPES from "./UserType";
import * as API from "./UserApis";
import * as MSG from "./UserMessages";
import Auth from "../../utils/Auth";
import { call, put, takeLatest, all } from "redux-saga/effects";
import {
  dispatchToasterError,
  dispatchToasterSuccess,
} from "../../utils/Shared";

export function* userITSLogin(action) {
  console.log("user Saga", action);
  try {
    const response = yield call(API.loginUserITS, action.payload);
    yield console.log("login user saga", response);
    yield call(Auth.signIn, response?.data || {});
    if (action.successCallback) {
      yield call(action.successCallback, response.data);
    }
    dispatchToasterSuccess(MSG.loginSuccess);
    yield put(ACTIONS.userLoginRespITS(response));
  } catch (err) {
    console.log(err)
    if (err?.response?.data?.message) {
      dispatchToasterError(err?.response?.data?.message);
    } else {
      dispatchToasterError(MSG.internalServerError);
    }
  }
}
export function* verifyTokenReq(action) {
  console.log("user Saga", action);
  try {
    const response = yield call(API.verifyTokenReq);
    yield console.log("verifyTokenReq", response);
    yield call(Auth.signIn, response?.data || {});
    if (action.successCallback) {
      yield call(action.successCallback);
    }
    yield put(ACTIONS.verifyTokenRes(response));
  } catch (err) {
    console.log(err)
    if (err?.response?.data?.message) {
      dispatchToasterError(err?.response?.data?.message);
    } else {
      dispatchToasterError(MSG.internalServerError);
    }
  }
}

export function* UserSagas() {
  yield all([takeLatest(TYPES.LOGIN_ITS_REQ, userITSLogin)]);
  yield all([takeLatest(TYPES.VERIFY_TOKEN_REQ, verifyTokenReq)]);
}
