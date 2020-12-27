import React from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";

import "./warningModal.scss";

const WarningModal = ({ warning, onClick }) => {
  const handleClose = () => {
    onClick && onClick();
  };

  return (
    <Modal
      isOpen={!!warning}
      onRequestClose={handleClose}
      ariaHideApp={false}
      className="warningModal"
    >
      <div className="warningModalWrap">
        <p className="warningModalText">{warning}</p>

        <div className="button" onClick={handleClose}>
          Закрыть
        </div>
      </div>
    </Modal>
  );
};

WarningModal.propTypes = {
  warning: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onClick: PropTypes.func.isRequired,
};

export default WarningModal;
