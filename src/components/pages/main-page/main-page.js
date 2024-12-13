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
import { resizeImageToCanvas } from '../../../utils/image-utils';

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
    resizeDimensions,
  } = useSelector((state) => state.image);

  const dispatch = useDispatch();
  const canvasRef = useRef(null);

  useEffect(() => {
    if (imageSrc) {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        dispatch(setImage(img));
        dispatch(setOriginalImage(img));
        const resizedDimensions = resizeImageToCanvas(img, 1000, 800);
        dispatch(setResizeDimensions(resizedDimensions));
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
    if (activeTool !== 5 && activeTool !== 6) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    dispatch(setDrawing(true));
    dispatch(setMask([...mask, { x, y, brushSize }]));
  };

  const handleMouseMove = (e) => {
    if (!drawing || (activeTool !== 5 && activeTool !== 6)) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    dispatch(setMask([...mask, { x, y, brushSize }]));
  };

  const handleMouseUp = () => {
    if (activeTool !== 5 && activeTool !== 6) return;
    dispatch(setDrawing(false));
  };

  return (
    <div className={styles.mainContainer}>
      <Header canvasRef={canvasRef} />
      <div className={styles.toolContainer}>
        <ToolBar />
        <Tools
          canvasRef={canvasRef}
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
