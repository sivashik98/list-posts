import React from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";

import "./modalWindow.scss";

const ModalWindow = ({ warning, onClick }) => {
  const handleClose = () => {
    onClick && onClick();
  };

  return (
    <Modal
      isOpen={!!warning}
      onRequestClose={handleClose}
      ariaHideApp={false}
      className="modal"
    >
      <div className="modalWrap">
        <p className="modalText">{warning}</p>

        <button onClick={handleClose} className="modalButton">
          Закрыть
        </button>
      </div>
    </Modal>
  );
};

ModalWindow.propTypes = {
  warning: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default ModalWindow;
