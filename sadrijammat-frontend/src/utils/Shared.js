import { store } from "../redux";
import {
  hideToasterAction,
  showToasterAction,
} from "../redux/Toaster/ToasterAction";

export function dispatchToasterError(errorMsg) {
  store.dispatch(showToasterAction(errorMsg, "error"));
}

export function dispatchToasterSuccess(message) {
  store.dispatch(showToasterAction(message, "success"));
}

export function dispatchToasterHide() {
  store.dispatch(hideToasterAction());
}

