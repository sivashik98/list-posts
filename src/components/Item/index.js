import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./item.scss";
import { useDispatch } from "react-redux";
import {
  likePost,
  deletePost,
  undoAction,
  redoAction,
} from "../../store/actions/posts";

const likeColorSvg = "darkred";

const Item = ({ id, title, liked, url, style, isFetching, provided }) => {
  const dispatch = useDispatch();

  const handleLike = (id) => () => {
    dispatch(likePost(id));
  };

  const handleDelete = (id) => () => {
    dispatch(deletePost(id));
  };

  // console.log(isFetching);
  // if (isFetching) {
  //   return (
  //     <div>
  //       <h3>spinner</h3>
  //     </div>
  //   );
  // }

  return (
    <div style={style}>
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className="item"
      >
        <div className="itemWrapSvg">
          <FontAwesomeIcon
            icon={"thumbs-up"}
            className={"itemSvg itemSvgLike"}
            style={{ color: liked && likeColorSvg }}
            onClick={handleLike(id)}
          />

          <FontAwesomeIcon
            icon={"trash"}
            className={"itemSvg itemSvgTrash"}
            onClick={handleDelete(id)}
          />
        </div>

        <a href={url} className="itemLink" target="blank">
          {title}
        </a>
      </div>
    </div>
  );
};

Item.propTypes = {
  title: PropTypes.string.isRequired,
  liked: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  style: PropTypes.object,
};

export default Item;
