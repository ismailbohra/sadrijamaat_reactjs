import { LOGIN_ITS_RESP, VERIFY_TOKEN_RES } from "./UserType";

const INITIAL_STATE = {
  data: {},
  token: "",
  tokenExpiresAt: null,
};

const setUser = (state, action) => {
  const { user, token, expiresAt } = action.payload.data;

  return {
    ...state,
    data: user,
    token: token,
    tokenExpiresAt: expiresAt,
  };
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_ITS_RESP:
      return setUser(state, action);
    case VERIFY_TOKEN_RES:
      return setUser(state, action);
    default:
      return state;
  }
};
