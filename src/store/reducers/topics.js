import { CREATE_TOPIC } from "../constatns";

const initialState = {
  topics: [],
};

const handleTopics = (state = initialState, action) => {
  const { topics } = state;

  if (action.type === CREATE_TOPIC) {
    return { ...state, topics: [...topics, action.payload] };
  }

  return state;
};

export default handleTopics;
