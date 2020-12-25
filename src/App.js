import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";

import BlockList from "./components/BlockList";
import Topic from "./components/Topic";
import ModalWindow from "./components/ModalWindow";
import { reorderPosts } from "./helpers/reorderPosts";
import { fetchPostsByTopic, reorder, hideWarning } from "./store/actions/posts";
import { test } from "./store/reducers/posts";

// import "./App.scss";

const App = () => {
  const { interaction } = useSelector((state) => state.app);
  const { presentPosts: posts, isFetching, warning } = useSelector(
    (state) => state.test.present
  );
  const { topics } = useSelector((state) => state.topics);
  const dispatch = useDispatch();

  const handleClick = (title) => () => {
    if (interaction) {
      dispatch(fetchPostsByTopic(title, posts));
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    if (result.source.index === result.destination.index) {
      return;
    }

    const newPosts = reorderPosts(
      posts,
      result.source.index,
      result.destination.index
    );

    dispatch(reorder(newPosts));
  };

  const handleCloseModal = () => {
    dispatch(hideWarning());
  };

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

//--------------------------------------------------------------------------

// const [data, setData] = useState(() => getItems(35));

// const getItems = (count) =>
//   Array.from({ length: count }, (v, k) => k).map((k) => ({
//     id: `item-${k}`,
//     content: `Короче тут статья про что-то ${k}`,
//   }));
