import {
  DISABLE_INTERACTION,
  ENABLE_INTERACTION,
} from "../constants/constatns";

const initialState = {
  interaction: true,
};

const handleApp = (state = initialState, action) => {
  if (action.type === DISABLE_INTERACTION) {
    return { ...state, interaction: false };
  }

  if (action.type === ENABLE_INTERACTION) {
    return { ...state, interaction: true };
  }

  return state;
};

export default handleApp;
