// import fetch from "isomorphic-fetch";

import {
  FETCH_POST,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAIL,
  REORDER_POSTS,
  HIDE_WARNING,
  TOGGLE_LIKE_POST,
  DELETE_POST,
  UNDO,
  REDO,
} from "../constants/constatns";

export const fetchPostByTopic = (topic, existedPosts) => ({
  type: FETCH_POST,
  payload: { topic, existedPosts },
});

export const pushFetchedPost = (post) => ({
  type: FETCH_POST_SUCCESS,
  payload: post,
});

export const showWarningFailedPost = (warning) => ({
  type: FETCH_POST_FAIL,
  payload: warning,
});

export const hideWarning = () => ({
  type: HIDE_WARNING,
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

export const undoAction = () => ({
  type: UNDO,
});

export const redoAction = () => ({
  type: REDO,
});

// helper

// export const fetchPostsByTopic = (topic, existedPosts) => async (dispatch) => {
//   dispatch(disableInteraction());
//   dispatch(createFetchStatus());
//   try {
//     setTimeout(async () => {
//       const response = await fetch(`https://www.reddit.com/r/${topic}.json`);
//       const json = await response.json();
//       const posts = json.data.children.map((el) => el.data);
//       const uniquePost = getUniquePost(posts, existedPosts);
//
//       if (uniquePost) {
//         dispatch(pushPost(uniquePost));
//       } else {
//         const warning = "Актуальные посты закончились";
//
//         dispatch(createWarning(warning));
//         setTimeout(hideWarning, 3000);
//       }
//
//       dispatch(enableInteraction());
//     }, 50);
//   } catch (e) {
//     const warning = "Ошибка запроса постов";
//
//     dispatch(createWarning(warning));
//     setTimeout(hideWarning, 3000);
//   }
// };
