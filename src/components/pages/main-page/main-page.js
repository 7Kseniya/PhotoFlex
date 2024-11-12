import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setImageSrc,
  setRotation,
  setCrop,
  setActiveTool,
} from '../../../services/actions/image-actions';
import styles from './main-page.module.css';
import Header from '../../header/header';
import ToolBar from '../../tool-bar/tool-bar';
import Tools from '../../tools/tools';
import ImageRotate from '../../editor-actions/image-rotate';
import ImageCrop from '../../editor-actions/image-crop';
import UploadContainer from '../../upload-container/upload-container';

const MainPage = () => {
  const dispatch = useDispatch();
  const { imageSrc, activeTool } = useSelector((state) => ({
    imageSrc: state.imageSrc,
    activeTool: state.activeTool,
  }));
  const handleRotate = (angle) => {
    dispatch(setRotation(angle));
  };

  const handleImageUpload = (src) => {
    dispatch(setImageSrc(src));
  };

  const handleCropChange = (newCrop) => {
    dispatch(setCrop(newCrop));
  };

  const renderActiveTool = () => {
    switch (activeTool) {
      case 1:
        return (
          <ImageCrop
            key="imageCrop"
            onCropChange={handleCropChange}
            data-testid="image-crop"
          />
        );
      case 2:
        return (
          <ImageRotate
            key="imageRotate"
            onRotate={handleRotate}
            data-testid="image-rotate"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.mainContainer} data-testid="main-page">
      <Header />
      <div className={styles.toolContainer}>
        <ToolBar setActiveTool={setActiveTool} />
        <Tools activeTool={activeTool} />
        <div className={styles.imageContainer}>
          {imageSrc ? (
            renderActiveTool()
          ) : (
            <UploadContainer
              onImageUpload={handleImageUpload}
              data-testid="file-input"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
