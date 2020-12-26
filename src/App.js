import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";

import BlockList from "./components/BlockList";
import Topic from "./components/Topic";
import ModalWindow from "./components/ModalWindow";
import { reorderPostsHelper } from "./helpers/reorderPostsHelper";
import {
  fetchPostByTopic,
  reorderPosts,
  hideWarning,
} from "./store/actions/posts";

const App = () => {
  const { interaction } = useSelector((state) => state.app);
  const { presentPosts: posts, isFetching, warning } = useSelector(
    (state) => state.posts.present
  );
  const { topics } = useSelector((state) => state.topics);
  const dispatch = useDispatch();

  const handleClick = (topic) => () => {
    if (interaction) {
      dispatch(fetchPostByTopic(topic, posts));
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    if (result.source.index === result.destination.index) {
      return;
    }

    const newPosts = reorderPostsHelper(
      posts,
      result.source.index,
      result.destination.index
    );

    dispatch(reorderPosts(newPosts));
  };

  const handleCloseModal = () => {
    dispatch(hideWarning());
  };
  // console.log(interaction);
  return (
    <>
      <ModalWindow warning={warning} onClick={handleCloseModal} />

      {topics.map((el) => (
        <Topic key={el} title={el} onClick={handleClick(el)} />
      ))}

      <DragDropContext onDragEnd={handleDragEnd}>
        <BlockList list={posts} isFetching={isFetching} />
      </DragDropContext>
    </>
  );
};

export default App;
