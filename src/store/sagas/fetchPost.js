import { takeEvery, put, call } from "redux-saga/effects";
import fetch from "isomorphic-fetch";

import { FETCH_POST } from "../constatns";
import { disableInteraction, enableInteraction } from "./../actions/app";
import { pushFetchedPost, removeFetchingStatus } from "./../actions/posts";
import { showWarning } from "./../actions/app";

const getUniquePostHelper = (posts, existedPosts) => {
  return posts.filter((post) =>
    existedPosts.every((existedPost) => existedPost.id !== post.id)
  )[0];
};

const fetchPostHelper = (payload) => () => {
  return fetch(
    `https://www.reddit.com/r/${payload.title}.json`
  ).then((response) => response.json());
};

function* fetchPostWorker({ payload }) {
  try {
    yield put(disableInteraction());

    const json = yield call(fetchPostHelper(payload.topic));
    const posts = json.data.children.map((el) => el.data);
    const uniquePost = getUniquePostHelper(posts, payload.existedPosts);

    if (uniquePost) {
      yield put(pushFetchedPost(uniquePost));
    } else {
      const warning = "Актуальные посты закончились";

      yield put(showWarning(warning));
      yield put(removeFetchingStatus());
    }

    yield put(enableInteraction());
  } catch (e) {
    const warning = "Ошибка запроса постов";

    yield put(showWarning(warning));
    yield put(removeFetchingStatus());
    yield put(enableInteraction());
  }
}

export function* fetchPostWatcher() {
  yield takeEvery(FETCH_POST, fetchPostWorker);
}
