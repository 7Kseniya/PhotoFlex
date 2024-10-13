import styles from './login-modal.module.css';
import Modal from '../modal';
import React from 'react';

const LoginModal = () => {
  return (
    <Modal>
      <div className={styles.mainContainer}></div>
    </Modal>
  );
};
export default LoginModal;
