import * as types from './ToasterTypes';

const INITIAL_STATE = {
  isOpen: false,
  message: '',
  type: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SHOW_TOASTER:
      return {
        ...state,
        isOpen: true,
        message: action.message,
        type: action.toasterType,
      };
    case types.HIDE_TOASTER:
      return {
        ...state,
        isOpen: false,
      };
    default:
      return state;
  }
};
