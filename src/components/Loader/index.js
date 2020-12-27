import React from "react";
import PropTypes from "prop-types";
import BeatLoader from "react-spinners/BeatLoader";

const Loader = ({ size, loading, color }) => {
  const defaultColor = "#fff";
  const defaultSize = 10;

  return (
    <BeatLoader
      loading={loading}
      size={size || defaultSize}
      color={color || defaultColor}
    />
  );
};

Loader.propTypes = {
  size: PropTypes.number,
  loading: PropTypes.bool,
  color: PropTypes.string,
};

export default Loader;
