import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./post.scss";
import Loader from "../Loader";
import { getShortName } from "../../helpers/getShortName";

import { toggleLikePost, deletePost } from "../../store/actions/posts";

const likeColorSvg = "darkred";
const maxSizeLetters = 75;

const Post = ({ item = false, style, provided }) => {
  const { isFetching } = useSelector((state) => state.posts.present);
  const dispatch = useDispatch();
  const title =
    item &&
    (item.title.length > maxSizeLetters
      ? getShortName(item.title, maxSizeLetters)
      : item.title);

  const handleLike = (id) => () => {
    dispatch(toggleLikePost(id));
  };

  const handleDelete = (id) => () => {
    dispatch(deletePost(id));
  };

  if (isFetching && !item) {
    return (
      <div style={style}>
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="postLoader"
        >
          <Loader loading={isFetching} />
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div style={style}>
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        />
      </div>
    );
  }

  return (
    <div style={style}>
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className="post"
      >
        <div className="postWrapSvg">
          <FontAwesomeIcon
            icon={"thumbs-up"}
            className={"postSvg postSvgLike"}
            style={{ color: item.liked && likeColorSvg }}
            onClick={handleLike(item.id)}
          />

          <FontAwesomeIcon
            icon={"trash"}
            className={"postSvg postSvgTrash"}
            onClick={handleDelete(item.id)}
          />
        </div>

        <a href={item.url} className="postLink" target="blank">
          {title}
        </a>
      </div>
    </div>
  );
};

Post.propTypes = {
  item: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default Post;
