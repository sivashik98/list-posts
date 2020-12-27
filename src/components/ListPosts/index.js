import React from "react";
import { useDispatch } from "react-redux";
import { ActionCreators } from "redux-undo";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { List, AutoSizer } from "react-virtualized";

import "./listPosts.scss";
import Post from "../Post";

const rowHeight = 65;
const getListRender = (list) => ({ key, index, style }) => {
  const item = list[index];

  return (
    <Draggable key={index} draggableId={`${index}`} index={index}>
      {(provided) => (
        <Post key={key} item={item} style={style} provided={provided} />
      )}
    </Draggable>
  );
};

const ListPosts = ({ list }) => {
  const dispatch = useDispatch();

  const handleRef = (provided) => (ref) => {
    if (ref) {
      const whatHasMyLifeComeTo = ReactDOM.findDOMNode(ref);

      if (whatHasMyLifeComeTo instanceof HTMLElement) {
        provided.innerRef(whatHasMyLifeComeTo);
      }
    }
  };

  const handleUndo = () => {
    dispatch(ActionCreators.undo());
  };

  const handleRedo = () => {
    dispatch(ActionCreators.redo());
  };

  return (
    <div className="listPosts">
      <div className="listPostsControl">
        <div className="button listPostsControlBtn" onClick={handleUndo}>
          Отменить действие
        </div>

        <div className="button listPostsControlBtn" onClick={handleRedo}>
          Вернуть
        </div>
      </div>

      <Droppable
        droppableId="droppable"
        mode="virtual"
        renderClone={(provided, snapshot, rubric) => {
          const item = list[rubric.source.index];

          return <Post item={item} provided={provided} />;
        }}
      >
        {(provided) => {
          return (
            <AutoSizer>
              {({ width, height }) => (
                <List
                  ref={handleRef(provided)}
                  height={height}
                  width={width}
                  rowCount={list.length + 1}
                  rowHeight={rowHeight}
                  rowRenderer={getListRender(list)}
                  className="listPostsForm"
                />
              )}
            </AutoSizer>
          );
        }}
      </Droppable>
    </div>
  );
};

ListPosts.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default ListPosts;
