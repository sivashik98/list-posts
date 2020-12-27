import React from "react";
import PropTypes from "prop-types";

import "./topic.scss";
import { getShortName } from "../../helpers/getShortName";

const maxSizeLetters = 10;

const Topic = ({ title, onClick }) => {
  const modifiedTitle =
    title.length > maxSizeLetters ? getShortName(title, maxSizeLetters) : title;

  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <div className="topic" onClick={handleClick}>
      <h3>{modifiedTitle}</h3>
    </div>
  );
};

Topic.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Topic;
