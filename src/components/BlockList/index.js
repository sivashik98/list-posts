import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { List, AutoSizer } from "react-virtualized";

import { undoAction, redoAction } from "../../store/actions/posts";

import "./blockList.scss";
import Item from "../Item";
import { getShortName } from "../../helpers/getShortName";
import { useDispatch } from "react-redux";

const rowHeight = 65;
const maxTitleLength = 55;
const getListRender = (list, isFetching) => ({ key, index, style }) => {
  const item = list[index];
  const title =
    item.title.length > maxTitleLength
      ? getShortName(item.title, maxTitleLength)
      : item.title;

  // console.log(isFetching);
  return (
    <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
      {(provided, snapshot) => (
        <Item
          key={key}
          id={item.id}
          title={title}
          liked={item.liked}
          url={item.url}
          style={style}
          provided={provided}
        />
      )}
    </Draggable>
  );
};

const BlockList = ({ list, isFetching }) => {
  const dispatch = useDispatch();

  const handleRef = (provided) => (ref) => {
    if (ref) {
      const whatHasMyLifeComeTo = ReactDOM.findDOMNode(ref);

      if (whatHasMyLifeComeTo instanceof HTMLElement) {
        provided.innerRef(whatHasMyLifeComeTo);
      }
    }
  };

  return (
    <>
      <div className="blockListControl">
        <div
          className="blockListControlButton"
          onClick={() => dispatch(undoAction())}
        >
          UNDO
        </div>

        <div
          className="blockListControlButton"
          onClick={() => dispatch(redoAction())}
        >
          REDO
        </div>
      </div>

      <Droppable
        droppableId="droppable"
        mode="virtual"
        renderClone={(provided, snapshot, rubric) => {
          const item = list[rubric.source.index];
          const title =
            item.title.length > maxTitleLength
              ? getShortName(item.title, maxTitleLength)
              : item.title;

          return (
            <Item
              title={title}
              liked={item.liked}
              url={item.url}
              provided={provided}
            />
          );
        }}
      >
        {(provided) => {
          return (
            <AutoSizer>
              {({ width, height }) => (
                <List
                  ref={handleRef(provided)}
                  height={height}
                  width={width / 2}
                  rowCount={list.length}
                  rowHeight={rowHeight}
                  rowRenderer={getListRender(list, isFetching)}
                  className="blockList"
                />
              )}
            </AutoSizer>
          );
        }}
      </Droppable>
    </>
  );
};

BlockList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default BlockList;
