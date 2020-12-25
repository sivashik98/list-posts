import {
  DISABLE_INTERACTION,
  ENABLE_INTERACTION,
  SHOW_WARNING,
  HIDE_WARNING,
} from "../constants/constatns";

export const disableInteraction = () => ({
  type: DISABLE_INTERACTION,
});

export const enableInteraction = () => ({
  type: ENABLE_INTERACTION,
});

// export const showWarning = (warning) => ({
//   type: SHOW_WARNING,
//   payload: warning,
// });

// export const hideWarning = () => ({
//   type: HIDE_WARNING,
// });
