import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import ModalOverlay from '../modal/modal-overlay';
import ClearIcon from '@mui/icons-material/Clear';
const modalRoot = document.getElementById('modal-root');
const Modal = ({ children, onClose }) => {
  // const [open, setOpen] = useState(false);

  // const handleClose = () => setOpen(false);
  // const handleOpen = () => setOpen(true);
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
      <ModalOverlay onClose={onClose} />
      <div className={styles.modal}>
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
