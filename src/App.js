import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";

import "./app.scss";
import ListPosts from "./components/ListPosts";
import Topic from "./components/Topic";
import WarningModal from "./components/WarningModal";
import TopicsForm from "./components/TopicsForm";
import { shufflePosts } from "./helpers/shufflePosts";

import { fetchPostByTopic, reorderPosts } from "./store/actions/posts";
import { hideWarning } from "./store/actions/app";

const App = () => {
  const { interaction, warning } = useSelector((state) => state.app);
  const { posts } = useSelector((state) => state.posts.present);
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

    const shuffledPosts = shufflePosts(
      posts,
      result.source.index,
      result.destination.index
    );

    dispatch(reorderPosts(shuffledPosts));
  };

  const handleCloseModal = () => {
    dispatch(hideWarning());
  };

  return (
    <>
      {topics.map((el) => (
        <Topic key={el.id} title={el.title} onClick={handleClick(el)} />
      ))}

      <div className="appWrap">
        <DragDropContext onDragEnd={handleDragEnd}>
          <ListPosts list={posts} />
        </DragDropContext>

        <TopicsForm topics={topics} />
      </div>

      <WarningModal warning={warning} onClick={handleCloseModal} />
    </>
  );
};

export default App;
