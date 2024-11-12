import { dispatchToasterError } from "../../utils/Shared";
import Auth from "./../../utils/Auth";

export const isHandlerEnabled = (config = {}) => {
  return !(
    Object.prototype.hasOwnProperty.call(config, "handlerEnabled") &&
    !config.handlerEnabled
  );
};

export const requestHandler = (request) => {
  const authToken = Auth.getToken();
  if (authToken) {
    request.headers.Authorization = `Bearer ${authToken}`;
  }
  console.log("New Req", request.baseURL);
  return request;
};

export const successHandler = (response) => {
  const { responseType = "json" } = response.config || {};
  if (responseType === "blob") {
    return { file: response.data, headers: response.headers };
  }
  console.log("New Response");
  return response.data;
};

export const errorHandler = (error) => {
  const { response } = error;
  if (response?.status === 401) {
    dispatchToasterError(response?.data?.message || "Unauthorized");
    if (Auth.isAuth) {
      Auth.signOut();
    }
  } else {
    dispatchToasterError(response?.data?.message);
  }

  return Promise.reject(error);
};
