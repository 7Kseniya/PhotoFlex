import styles from './main-page.module.css';
import Header from '../../header/header';
import ToolBar from '../../tool-bar/tool-bar';
import Tools from '../../tools/tools';
import ImageRotate from '../../editor-actions/image-rotate';
import React, { useState } from 'react';
import UploadContainer from '../../upload-container/upload-container';
import PropTypes from 'prop-types';

const MainPage = ({ initialImageSrc = null }) => {
  const [imageSrc, setImageSrc] = useState(initialImageSrc);
  const [rotation, setRotation] = useState(0);
  const [activeTool, setActiveTool] = useState(-1);

  const handleRotate = (angle) => {
    setRotation((prevRotation) => prevRotation + angle);
  };

  const handleImageUpload = (src) => {
    setImageSrc(src);
    setRotation(0);
  };

  return (
    <div className={styles.mainContainer} data-testid="main-page">
      <Header />
      <div className={styles.toolContainer}>
        <ToolBar setActiveTool={setActiveTool} />
        <Tools onRotate={handleRotate} activeTool={activeTool} />
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

MainPage.propTypes = {
  initialImageSrc: PropTypes.string,
};
export default MainPage;
