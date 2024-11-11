import { all } from "redux-saga/effects";
import { UserSagas } from "../users/UserSaga";
import { MumineenSagas } from "../Mumineen/MumineenSaga";

export function* watchSagas() {
  yield all([UserSagas(), MumineenSagas()]);
}
