import styles from './register-modal.module.css';
import Modal from '../modal';
import React from 'react';

const RegisterModal = () => {
  return (
    <Modal>
      <div className={styles.mainContainer}></div>
    </Modal>
  );
};
export default RegisterModal;
