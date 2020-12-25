import React from "react";

import "./topic.scss";
import PropTypes from "prop-types";

const Topic = ({ title, onClick }) => {
  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <div className="topic" onClick={handleClick}>
      <h3>{title}</h3>
    </div>
  );
};

Topic.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default Topic;
