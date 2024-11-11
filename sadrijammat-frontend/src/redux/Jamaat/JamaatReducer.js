import { DELETE_RAZA_RESP, GET_ALL_RAZA_RESP, GET_MUMINEEN_BY_ID_RESP, GET_RAZA_TYPE_RESP } from "./JamaatType";

const INITIAL_STATE = {
  razaType: [],
  raza: [],
  mumineen:{},
};

const setRazaType = (state, action) => {
  const { data } = action.payload;
  return {
    ...state,
    razaType: data,
  };
};
const setRaza = (state, action) => {
  const { data } = action.payload;
  return {
    ...state,
    raza:data
  };
};
const setMumineen = (state, action) => {
  const { data } = action.payload;
  return {
    ...state,
    mumineen:data
  };
};
const deleteRaza = (state, action) => {
  const id  = action.payload;
  const temp = state.raza.filter(e=>e._id!=id)
  return {
    ...state,
    raza:temp
  };
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_RAZA_TYPE_RESP:
      return setRazaType(state, action);
    case GET_ALL_RAZA_RESP:
      return setRaza(state, action);
    case GET_MUMINEEN_BY_ID_RESP:
      return setMumineen(state, action);
    case DELETE_RAZA_RESP:
      return deleteRaza(state, action);
    default:
      return state;
  }
};
