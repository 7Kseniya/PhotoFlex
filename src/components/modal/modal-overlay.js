import React from 'react';
import styles from '../modal/modal-overlay.module.css';

const ModalOverlay = ({ onClose }) => {
  return (
    <div
      className={styles.overlayBack}
      onClick={onClose}
      data-testid="modal-overlay"
    ></div>
  );
};

export default ModalOverlay;
