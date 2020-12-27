import {
  FETCH_POST,
  FETCH_POST_FAIL,
  FETCH_POST_SUCCESS,
  REORDER_POSTS,
  TOGGLE_LIKE_POST,
  DELETE_POST,
} from "../constatns";

const initialState = {
  posts: [],
  isFetching: false,
};
const additionalProperties = { liked: false };

const handlePosts = (state = initialState, action) => {
  const { posts } = state;

  if (action.type === FETCH_POST) {
    return {
      ...state,
      isFetching: true,
    };
  }

  if (action.type === FETCH_POST_SUCCESS) {
    return {
      ...state,
      posts: [...posts, { ...action.payload, ...additionalProperties }],
      isFetching: false,
    };
  }

  if (action.type === FETCH_POST_FAIL) {
    return { ...state, isFetching: false };
  }

  if (action.type === REORDER_POSTS) {
    return { ...state, posts: action.payload };
  }

  if (action.type === TOGGLE_LIKE_POST) {
    return {
      ...state,
      posts: posts.map((el) =>
        el.id === action.payload ? { ...el, liked: !el.liked } : el
      ),
    };
  }

  if (action.type === DELETE_POST) {
    return {
      ...state,
      posts: posts.filter((el) => el.id !== action.payload),
    };
  }

  return state;
};

export default handlePosts;
