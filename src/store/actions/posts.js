import {
  FETCH_POST,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAIL,
  REORDER_POSTS,
  TOGGLE_LIKE_POST,
  DELETE_POST,
} from "../constants";

export const fetchPostByTopic = (topic, existedPosts) => ({
  type: FETCH_POST,
  payload: { topic, existedPosts },
});

export const pushFetchedPost = (post) => ({
  type: FETCH_POST_SUCCESS,
  payload: post,
});

export const removeFetchingStatus = () => ({
  type: FETCH_POST_FAIL,
});

export const reorderPosts = (posts) => ({
  type: REORDER_POSTS,
  payload: posts,
});

export const toggleLikePost = (id) => ({
  type: TOGGLE_LIKE_POST,
  payload: id,
});

export const deletePost = (id) => ({
  type: DELETE_POST,
  payload: id,
});
