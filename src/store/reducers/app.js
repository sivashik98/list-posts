import {
  DISABLE_INTERACTION,
  ENABLE_INTERACTION,
  SHOW_WARNING,
  HIDE_WARNING,
} from "../constants";

const initialState = {
  interaction: true,
  warning: null,
};

const handleApp = (state = initialState, action) => {
  if (action.type === DISABLE_INTERACTION) {
    return { ...state, interaction: false };
  }

  if (action.type === ENABLE_INTERACTION) {
    return { ...state, interaction: true };
  }

  if (action.type === SHOW_WARNING) {
    return { ...state, warning: action.payload };
  }

  if (action.type === HIDE_WARNING) {
    return { ...state, warning: null };
  }

  return state;
};

export default handleApp;
