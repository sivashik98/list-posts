import { CREATE_TOPIC } from "../constatns";

export const addTopic = (topic) => ({
  type: CREATE_TOPIC,
  payload: topic,
});
