import React from 'react';
import { useEffect } from 'react';

const Modal = ({ closeKey, close, renderImage }) => {
  useEffect(() => {
    console.log(closeKey);
    window.document.addEventListener('keydown', closeKey);
    return window.document.removeEventListener('keydown', closeKey);
  }, []);

  return (
    <div className="overlay" onClick={close}>
      <div className="modal">
        <img src={renderImage.nodeValue} alt="" />
      </div>
    </div>
  );
};

export default Modal;
