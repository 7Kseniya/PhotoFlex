import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './main-page.module.css';
import Header from '../../header/header';
import UploadContainer from '../../upload-container/upload-container';
import ToolBar from '../../tool-bar/tool-bar';
import Tools from '../../tools/tools';
import {
  setActiveTool,
  setResizeDimensions,
} from '../../../services/actions/image-actions';

const MainPage = () => {
  const {
    imageSrc,
    activeTool,
    rotationAngle,
    resizeDimensions,
    filter,
    cropArea,
  } = useSelector((state) => state.image);
  const { width, height } = resizeDimensions;
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);
  const [drawing, setDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(10);
  const [mask, setMask] = useState([]);
  const [appliedMask, setAppliedMask] = useState([]);
  const [originalImage, setOriginalImage] = useState(null);
  const [showOriginal, setShowOriginal] = useState(false);
  const [originalDimensions, setOriginalDimensions] = useState({
    width: 0,
    height: 0,
  });

  const filterStyles = {
    none: {},
    grayscale: { filter: 'grayscale(100%)' },
    sepia: { filter: 'sepia(100%)' },
    invert: { filter: 'invert(100%)' },
    outerspace: {
      filter:
        'grayscale(70%) contrast(120%) hue-rotate(200deg) brightness(0.9)',
    },
    refulgence: {
      filter: 'contrast(180%) saturate(250%) brightness(1.3)',
    },
    pink: {
      filter:
        'hue-rotate(320deg) saturate(500%) brightness(1.3) contrast(120%)',
    },
  };

  const selectedFilter = filterStyles[filter];

  useEffect(() => {
    if (imageSrc) {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        setImage(img);
        setOriginalImage(img);
        setOriginalDimensions({
          width: img.width,
          height: img.height,
        });
        setResizeDimensions({ width: img.width, height: img.height });
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
          originalDimensions.width,
          originalDimensions.height
        );
      } else {
        ctx.save();

        ctx.filter = selectedFilter.filter;

        const cropX = cropArea.x;
        const cropY = cropArea.y;
        const cropWidth = originalDimensions.width;
        const cropHeight = originalDimensions.height;

        const dWidth = resizeDimensions.width;
        const dHeight = resizeDimensions.height;

        const dx = (canvas.width - dWidth) / 2;
        const dy = (canvas.height - dHeight) / 2;

        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((rotationAngle * Math.PI) / 180);
        ctx.translate(-canvas.width / 2, -canvas.height / 2);

        ctx.drawImage(
          image,
          cropX,
          cropY,
          cropWidth,
          cropHeight,
          dx,
          dy,
          dWidth,
          dHeight
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
    filter,
    cropArea,
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
