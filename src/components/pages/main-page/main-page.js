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

  const renderActiveTool = () => {
    switch (activeTool) {
      case 1:
        return (
          <ImageCrop key="imageCrop" imageSrc={imageSrc} {...crop} />
        );
      case 2:
        return (
          <ImageRotate
            key="imageRotate"
            imageSrc={imageSrc}
            rotation={rotation}
          />
        );
      default:
        return (
          <UploadContainer
            key="uploadContainer"
            onImageUpload={handleImageUpload}
          />
        );
    }
  };

  return (
    <div className={styles.mainContainer} data-testid="main-page">
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
            renderActiveTool()
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
