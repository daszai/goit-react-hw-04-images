import React from 'react';

const Modal = ({ closeKey, close, renderImage }) => {
  return (
    <div className="overlay" onClick={close}>
      <div className="modal">
        <img src={renderImage.nodeValue} alt="" />
      </div>
    </div>
  );
};

export default Modal;
