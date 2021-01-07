import { CREATE_TOPIC } from "../constants";

export const addTopic = (topic) => ({
  type: CREATE_TOPIC,
  payload: topic,
});
