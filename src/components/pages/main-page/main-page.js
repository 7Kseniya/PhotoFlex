import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './main-page.module.css';
import Header from '../../header/header';
import UploadContainer from '../../upload-container/upload-container';
import ToolBar from '../../tool-bar/tool-bar';
import Tools from '../../tools/tools';
import {
  setActiveTool,
  setCropDimensions,
} from '../../../services/actions/image-actions';

const MainPage = () => {
  const { imageSrc, activeTool, rotationAngle, cropDimensions } =
    useSelector((state) => state.image);
  const { width, height } = cropDimensions;
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);
  const [drawing, setDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(10);
  const [mask, setMask] = useState([]);
  const [appliedMask, setAppliedMask] = useState([]);
  const [originalImage, setOriginalImage] = useState(null);
  const [showOriginal, setShowOriginal] = useState(false);

  useEffect(() => {
    if (imageSrc) {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        setImage(img);
        setOriginalImage(img);
        setCropDimensions({ width: img.width, height: img.height });
      };
    }
  }, [imageSrc]);

  const drawImage = () => {
    if (image && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (showOriginal) {
        ctx.drawImage(
          originalImage,
          0,
          0,
          cropDimensions.width,
          cropDimensions.height
        );
      } else {
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((rotationAngle * Math.PI) / 180);
        ctx.drawImage(
          image,
          -cropDimensions.width / 2,
          -cropDimensions.height / 2,
          cropDimensions.width,
          cropDimensions.height
        );
        ctx.restore();
        if (mask.length > 0) {
          ctx.save();
          ctx.globalCompositeOperation = 'source-over';
          ctx.strokeStyle = 'red';
          ctx.lineWidth = brushSize * 2;
          ctx.lineCap = 'round';
          ctx.beginPath();
          for (let i = 0; i < mask.length - 1; i++) {
            ctx.moveTo(mask[i].x, mask[i].y);
            ctx.lineTo(mask[i + 1].x, mask[i + 1].y);
          }
          ctx.stroke();
          ctx.restore();
        }
        if (appliedMask.length > 0) {
          ctx.save();
          ctx.globalCompositeOperation = 'destination-out';
          ctx.fillStyle = 'black';
          for (let i = 0; i < appliedMask.length; i++) {
            const point = appliedMask[i];
            ctx.beginPath();
            ctx.arc(point.x, point.y, brushSize, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }
      }
    }
  };

  useEffect(() => {
    drawImage();
  }, [
    image,
    rotationAngle,
    width,
    height,
    mask,
    appliedMask,
    brushSize,
    showOriginal,
  ]);

  const handleMouseDown = (e) => {
    if (activeTool !== 5) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setDrawing(true);
    setMask((prevMask) => [...prevMask, { x, y }]);
  };

  const handleMouseMove = (e) => {
    if (!drawing || activeTool !== 5) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMask((prevMask) => [...prevMask, { x, y }]);
  };

  const handleMouseUp = () => setDrawing(false);

  const handleBrushSizeChange = (size) => setBrushSize(size);

  const handleRemoveBackground = () => {
    setAppliedMask(mask);
    setMask([]);
  };

  const handleReset = () => {
    setMask([]);
    setAppliedMask([]);
  };

  return (
    <div className={styles.mainContainer}>
      <Header
        canvasRef={canvasRef}
        setShowOriginal={setShowOriginal}
      />
      <div className={styles.toolContainer}>
        <ToolBar setActiveTool={setActiveTool} />
        <Tools
          activeTool={activeTool}
          brushSize={brushSize}
          onBrushSizeChange={handleBrushSizeChange}
          onRemoveBackground={handleRemoveBackground}
          onReset={handleReset}
        />
        <div className={styles.imageContainer}>
          {imageSrc ? (
            <div
              style={{
                width: `${width}px`,
                height: `${height}px`,
                overflow: 'hidden',
              }}
            >
              <canvas
                ref={canvasRef}
                width={width}
                height={height}
                style={{
                  width: '100%',
                  height: '100%',
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                data-testid="canvas"
              />
            </div>
          ) : (
            <UploadContainer />
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
