import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './main-page.module.css';
import Header from '../../header/header';
import UploadContainer from '../../upload-container/upload-container';
import ToolBar from '../../tool-bar/tool-bar';
import Tools from '../../tools/tools';
import useImageDrawer from '../../../hooks/drawHook';
import {
  setDrawing,
  setImage,
  setMask,
  setOriginalImage,
  setResizeDimensions,
} from '../../../services/actions/image-actions';
const MainPage = () => {
  const {
    imageSrc,
    activeTool,
    rotationAngle,
    filter,
    cropArea,
    brushSize,
    mask,
    appliedMask,
    drawing,
    showOriginal,
    originalImage,
    image,
  } = useSelector((state) => state.image);
  const resizeDimensions = useSelector(
    (state) => state.image.resizeDimensions || { width: 0, height: 0 }
  );

  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  useEffect(() => {
    if (imageSrc) {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        dispatch(setImage(img));
        dispatch(setOriginalImage(img));
        const maxWidth = 1000;
        const maxHeight = 800;
        const imgWidth = img.width;
        const imgHeight = img.height;
        let width = imgWidth;
        let height = imgHeight;
        const aspectRatio = imgWidth / imgHeight;
        if (imgWidth > maxWidth || imgHeight > maxHeight) {
          if (aspectRatio > 1) {
            width = maxWidth;
            height = maxWidth / aspectRatio;
          } else {
            height = maxHeight;
            width = maxHeight * aspectRatio;
          }
        }
        dispatch(
          setResizeDimensions({
            width: Math.round(width),
            height: Math.round(height),
          })
        );
      };
    }
  }, [imageSrc, dispatch]);
  useImageDrawer({
    canvasRef,
    image,
    originalImage,
    showOriginal,
    filter,
    cropArea,
    resizeDimensions,
    rotationAngle,
    mask,
    appliedMask,
    brushSize,
  });
  const handleMouseDown = (e) => {
    if (activeTool !== 5) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    dispatch(setDrawing(true));
    dispatch(setMask([...mask, { x, y, brushSize: brushSize }]));
  };
  const handleMouseMove = (e) => {
    if (!drawing || activeTool !== 5) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    dispatch(setMask([...mask, { x, y, brushSize: brushSize }]));
  };
  const handleMouseUp = () => {
    dispatch(setDrawing(false));
  };
  return (
    <div className={styles.mainContainer}>
      <Header canvasRef={canvasRef} />
      <div className={styles.toolContainer}>
        <ToolBar />
        <Tools
          activeTool={activeTool}
          data-testid="tools-component"
        />
        <div className={styles.imageContainer}>
          {imageSrc ? (
            <div
              style={{
                width: `${resizeDimensions?.width || 800}px`,
                height: `${resizeDimensions?.height || 900}px`,
                overflow: 'hidden',
              }}
            >
              <canvas
                ref={canvasRef}
                width={resizeDimensions.width}
                height={resizeDimensions.height}
                style={{ maxWidth: '100%', maxHeight: '100%' }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                data-testid="canvasMain"
              />
            </div>
          ) : (
            <UploadContainer data-testid="upload-container" />
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
