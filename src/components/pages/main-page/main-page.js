import styles from './main-page.module.css';
import Header from '../../header/header';
import ToolBar from '../../tool-bar/tool-bar';
import Tools from '../../tools/tools';
import ImageRotate from '../../editor-actions/image-rotate';
import React, { useState } from 'react';
import Modal from '../../modal/modal';
import LoginModal from '../../modal/login-modal/login-modal';
import RegisterModal from '../../modal/register-modal/register-modal';

const MainPage = () => {
  const [imageSrc, setImageSrc] = useState('/placeholder.jpeg');
  const [rotation, setRotation] = useState(0);
  const [modalType, setModalType] = useState(null);

  const handleRotate = () => {
    setRotation((prevRotation) => prevRotation + 90);
  };

  const openLoginModal = () => setModalType('login');
  const openRegisterModal = () => setModalType('register');
  const closeModal = () => setModalType(null);

  return (
    <div className={styles.mainContainer} data-testid="main-page">
      <Header onAccountClick={openLoginModal} />
      <div className={styles.toolContainer}>
        <ToolBar onRotate={handleRotate} />
        <Tools />
        <ImageRotate imageSrc={imageSrc} rotation={rotation} />
      </div>
      {modalType == 'login' && (
        <Modal onClose={closeModal}>
          <LoginModal
            onSignUpClick={openRegisterModal}
            onSubmited={closeModal}
          />
        </Modal>
      )}
      {modalType == 'register' && (
        <Modal onClose={closeModal}>
          <RegisterModal
            onSignInClick={openLoginModal}
            onSubmited={closeModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default MainPage;
