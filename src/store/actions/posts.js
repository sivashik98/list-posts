import fetch from "isomorphic-fetch";

import {
  FETCH_POST,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAIL,
  REORDER_POSTS,
  HIDE_WARNING,
  LIKE_POST,
  DELETE_POST,
  UNDO,
  REDO,
} from "../constants/constatns";
import { disableInteraction, enableInteraction } from "./app";

const pushPost = (post) => ({
  type: FETCH_POST_SUCCESS,
  payload: post,
});

const createWarning = (warning) => ({
  type: FETCH_POST_FAIL,
  payload: warning,
});

const createFetchStatus = () => ({
  type: FETCH_POST,
});

export const reorder = (posts) => ({
  type: REORDER_POSTS,
  payload: posts,
});

export const hideWarning = () => ({
  type: HIDE_WARNING,
});

export const likePost = (id) => ({
  type: LIKE_POST,
  payload: id,
});

export const deletePost = (id) => ({
  type: DELETE_POST,
  payload: id,
});

export const undoAction = () => ({
  type: UNDO,
});

export const redoAction = () => ({
  type: REDO,
});

// helper
const getUniquePost = (posts, existedPosts) => {
  return posts.filter((post) =>
    existedPosts.every((existedPost) => existedPost.id !== post.id)
  )[0];
};

export const fetchPostsByTopic = (topic, existedPosts) => async (dispatch) => {
  dispatch(disableInteraction());
  dispatch(createFetchStatus());
  try {
    setTimeout(async () => {
      const response = await fetch(`https://www.reddit.com/r/${topic}.json`);
      const json = await response.json();
      const posts = json.data.children.map((el) => el.data);
      const uniquePost = getUniquePost(posts, existedPosts);

      if (uniquePost) {
        dispatch(pushPost(uniquePost));
      } else {
        const warning = "Актуальные посты закончились";

        dispatch(createWarning(warning));
        setTimeout(hideWarning, 3000);
      }

      dispatch(enableInteraction());
    }, 50);
  } catch (e) {
    const warning = "Ошибка запроса постов";

    dispatch(createWarning(warning));
    setTimeout(hideWarning, 3000);
  }
};
