import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import ClearIcon from '@mui/icons-material/Clear';
import styles from './modal.module.css';
import ModalOverlay from './modal-overlay';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ children, onClose }) => {
  useEffect(() => {
    const handleClose = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleClose);

    return () => {
      document.removeEventListener('keydown', handleClose);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={onClose} data-testid="modal-overlay" />
      <div className={styles.modal} data-testid="clear-icon">
        <div onClick={onClose}>
          <ClearIcon className={styles.clearIcon} />
        </div>
        {children}
      </div>
    </>,
    modalRoot
  );
};

export default Modal;
