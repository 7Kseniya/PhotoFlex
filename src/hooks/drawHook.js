import { useEffect, useCallback } from 'react';

const transformPoint = (
  { x, y },
  canvasWidth,
  canvasHeight,
  rotationAngle,
  scale
) => {
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;
  const dx = x - centerX;
  const dy = y - centerY;
  const angleRad = (rotationAngle * Math.PI) / 180;
  const rotatedX = dx * Math.cos(angleRad) - dy * Math.sin(angleRad);
  const rotatedY = dx * Math.sin(angleRad) + dy * Math.cos(angleRad);
  return {
    x: centerX + rotatedX * scale,
    y: centerY + rotatedY * scale,
  };
};

const drawTransformedMask = (
  ctx,
  mask,
  canvasWidth,
  canvasHeight,
  rotationAngle,
  scale
) => {
  mask.forEach((point) => {
    const { x, y } = transformPoint(
      point,
      canvasWidth,
      canvasHeight,
      rotationAngle,
      scale
    );
    ctx.beginPath();
    ctx.arc(x, y, (point.brushSize / 2) * scale, 0, Math.PI * 2);
    ctx.fill();
  });
};
const useImageDrawer = ({
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
}) => {
  const drawImage = useCallback(() => {
    if (image && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (showOriginal) {
        ctx.drawImage(
          originalImage,
          0,
          0,
          originalImage.width,
          originalImage.height
        );
      } else {
        const filters = {
          none: 'none',
          grayscale: 'grayscale(100%)',
          sepia: 'sepia(100%)',
          invert: 'invert(100%)',
          outerspace: 'hue-rotate(240deg)',
          refulgence: 'contrast(150%) brightness(120%)',
          pink: 'hue-rotate(300deg)',
        };

        ctx.save();
        ctx.filter = filters[filter] || 'none';

        const cropX = cropArea?.x || 0;
        const cropY = cropArea?.y || 0;
        const cropWidth = cropArea?.width || originalImage.width;
        const cropHeight = cropArea?.height || originalImage.height;

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        ctx.translate(centerX, centerY);
        ctx.rotate((rotationAngle * Math.PI) / 180);
        ctx.translate(-centerX, -centerY);

        ctx.drawImage(
          image,
          cropX,
          cropY,
          cropWidth,
          cropHeight,
          (canvas.width - resizeDimensions.width) / 2,
          (canvas.height - resizeDimensions.height) / 2,
          resizeDimensions.width,
          resizeDimensions.height
        );
        ctx.restore();

        const scale = resizeDimensions.width / image.width;
        if (mask.length > 0) {
          ctx.save();
          ctx.globalCompositeOperation = 'source-over';
          ctx.fillStyle = 'red';
          drawTransformedMask(
            ctx,
            mask,
            canvas.width,
            canvas.height,
            rotationAngle,
            scale
          );
          ctx.restore();
        }

        if (appliedMask.length > 0) {
          ctx.save();
          ctx.globalCompositeOperation = 'destination-out';
          ctx.fillStyle = 'black';
          drawTransformedMask(
            ctx,
            appliedMask,
            canvas.width,
            canvas.height,
            rotationAngle,
            scale
          );
          ctx.restore();
        }
      }
    }
  }, [
    canvasRef,
    image,
    originalImage,
    showOriginal,
    filter,
    resizeDimensions,
    rotationAngle,
    mask,
    appliedMask,
    cropArea,
    brushSize,
  ]);
  useEffect(() => {
    drawImage();
  }, [drawImage]);
};

export default useImageDrawer;
