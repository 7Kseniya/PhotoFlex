import styles from './main-page.module.css';
import Header from '../../header/header';
import ToolBar from '../../tool-bar/tool-bar';
import Tools from '../../tools/tools';
import ImageRotate from '../../editor-actions/image-rotate';
import React, { useState } from 'react';
import Modal from '../../modal/modal';
import LoginModal from '../../modal/login-modal/login-modal';

const MainPage = () => {
  const [imageSrc, setImageSrc] = useState('/placeholder.jpeg');
  const [rotation, setRotation] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRotate = () => {
    setRotation((prevRotation) => prevRotation + 90);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={styles.mainContainer} data-testid="main-page">
      <Header onAccountClick={openModal} />
      <div className={styles.toolContainer}>
        <ToolBar onRotate={handleRotate} />
        <Tools />
        <ImageRotate imageSrc={imageSrc} rotation={rotation} />
      </div>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <LoginModal />
        </Modal>
      )}
    </div>
  );
};

export default MainPage;
