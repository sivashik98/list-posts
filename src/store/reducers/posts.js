import {
  FETCH_POST,
  FETCH_POST_FAIL,
  FETCH_POST_SUCCESS,
  REORDER_POSTS,
  HIDE_WARNING,
  TOGGLE_LIKE_POST,
  DELETE_POST,
  UNDO,
  REDO,
} from "../constants/constatns";

const initialState = {
  pastPosts: [],
  presentPosts: [],
  futurePosts: [],
  isFetching: false,
  warning: null,
};
const additionalProperties = { liked: false };

const handlePosts = (state = initialState, action) => {
  const { pastPosts, presentPosts, futurePosts, isFetching, warning } = state;

  if (action.type === FETCH_POST) {
    return {
      ...state,
      isFetching: true,
    };
  }

  if (action.type === FETCH_POST_SUCCESS) {
    return {
      ...state,
      presentPosts: [
        ...presentPosts,
        { ...action.payload, ...additionalProperties },
      ],
      isFetching: false,
    };
  }

  if (action.type === FETCH_POST_FAIL) {
    return { ...state, isFetching: false, warning: action.payload };
  }

  if (action.type === REORDER_POSTS) {
    return { ...state, presentPosts: action.payload };
  }

  if (action.type === TOGGLE_LIKE_POST) {
    return {
      ...state,
      presentPosts: presentPosts.map((el) =>
        el.id === action.payload ? { ...el, liked: !el.liked } : el
      ),
    };
  }

  if (action.type === DELETE_POST) {
    return {
      ...state,
      presentPosts: presentPosts.filter((el) => el.id !== action.payload),
      pastPosts: [
        ...pastPosts,
        presentPosts.find((el) => el.id === action.payload),
      ],
    };
  }

  if (action.type === UNDO) {
    return { ...state, presentPosts: action.payload };
  }

  if (action.type === REDO) {
    return { ...state, presentPosts: action.payload };
  }

  if (action.type === HIDE_WARNING) {
    return { ...state, warning: null };
  }

  return state;
};

export default handlePosts;
