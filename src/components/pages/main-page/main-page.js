import React, { useState } from 'react';
import styles from './main-page.module.css';
import Header from '../../header/header';
import ToolBar from '../../tool-bar/tool-bar';
import Tools from '../../tools/tools';
import ImageRotate from '../../editor-actions/image-rotate';
import ImageCrop from '../../editor-actions/image-crop';
import UploadContainer from '../../upload-container/upload-container';
import PropTypes from 'prop-types';

const MainPage = ({ initialImageSrc = null }) => {
  const [imageSrc, setImageSrc] = useState(initialImageSrc);
  const [rotation, setRotation] = useState(0);
  const [activeTool, setActiveTool] = useState(2);
  const [crop, setCrop] = useState({
    cropX: 0,
    cropY: 0,
    cropWidth: 1000,
    cropHeight: 1000,
  });

  const handleRotate = (angle) => {
    setRotation((prevRotation) => prevRotation + angle);
  };

  const handleImageUpload = (src) => {
    setImageSrc(src);
    setRotation(0);
  };

  const handleCropChange = (newCrop) => {
    setCrop(newCrop);
  };

  return (
    <div className={styles.mainContainer}>
      <Header />
      <div className={styles.toolContainer}>
        <ToolBar setActiveTool={setActiveTool} />
        <Tools
          onRotate={handleRotate}
          onCropChange={handleCropChange}
          activeTool={activeTool}
          imageSrc={imageSrc}
        />
        <div className={styles.imageContainer}>
          {imageSrc ? (
            activeTool === 2 ? (
              <ImageRotate imageSrc={imageSrc} rotation={rotation} />
            ) : activeTool === 1 ? (
              <ImageCrop imageSrc={imageSrc} {...crop} />
            ) : (
              <UploadContainer onImageUpload={handleImageUpload} />
            )
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
