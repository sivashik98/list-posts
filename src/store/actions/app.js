import {
  DISABLE_INTERACTION,
  ENABLE_INTERACTION,
} from "../constants/constatns";

export const disableInteraction = () => ({
  type: DISABLE_INTERACTION,
});

export const enableInteraction = () => ({
  type: ENABLE_INTERACTION,
});
