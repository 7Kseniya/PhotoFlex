import styles from './main-page.module.css';
import Header from '../../header/header';
import ToolBar from '../../tool-bar/tool-bar';
import Tools from '../../tools/tools';
import ImageRotate from '../../editor-actions/image-rotate';
import React, { useState } from 'react';
import UploadContainer from '../../upload-container/upload-container';

const MainPage = () => {
  const [imageSrc, setImageSrc] = useState('placeholder.jpeg');
  const [rotation, setRotation] = useState(0);

  const handleRotate = () => {
    setRotation((prevRotation) => prevRotation + 90);
  };

  const handleImageUpload = (src) => {
    setImageSrc(src);
    setRotation(0); // Сброс поворота при загрузке нового изображения
  };

  return (
    <div className={styles.mainContainer} data-testid="main-page">
      <Header />
      <div className={styles.toolContainer}>
        <ToolBar onRotate={handleRotate} />
        <Tools />
        <div className={styles.imageContainer}>
          {imageSrc ? (
            <ImageRotate imageSrc={imageSrc} rotation={rotation} />
          ) : (
            <UploadContainer onImageUpload={handleImageUpload} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
