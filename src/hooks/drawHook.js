import { useEffect, useCallback } from 'react';
import { applyMaskTransformation } from '../utils/image-utils';
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
}) => {
  const applyFilters = (ctx, filter) => {
    const filters = {
      none: 'none',
      grayscale: 'grayscale(100%)',
      sepia: 'sepia(100%)',
      invert: 'invert(100%)',
      outerspace: 'hue-rotate(240deg)',
      refulgence: 'contrast(150%) brightness(120%)',
      pink: 'hue-rotate(300deg)',
    };
    ctx.filter = filters[filter] || 'none';
  };
  const drawBaseImage = (
    ctx,
    image,
    width,
    height,
    cropArea,
    canvas,
    rotationAngle
  ) => {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((rotationAngle * Math.PI) / 180);
    ctx.translate(-centerX, -centerY);
    ctx.drawImage(
      image,
      cropArea?.x || 0,
      cropArea?.y || 0,
      cropArea?.width || image.width,
      cropArea?.height || image.height,
      (canvas.width - width) / 2,
      (canvas.height - height) / 2,
      width,
      height
    );
    ctx.restore();
  };
  const drawImage = useCallback(() => {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const { width, height } = resizeDimensions;
    if (showOriginal) {
      ctx.drawImage(
        originalImage,
        0,
        0,
        originalImage.width,
        originalImage.height
      );
    } else {
      applyFilters(ctx, filter);
      drawBaseImage(
        ctx,
        image,
        width,
        height,
        cropArea,
        canvas,
        rotationAngle
      );
      if (mask.length > 0) {
        const scale = width / image.width;
        applyMaskTransformation(
          ctx,
          mask,
          scale,
          'red',
          'source-over'
        );
      }
    }
  }, [
    canvasRef,
    image,
    originalImage,
    showOriginal,
    filter,
    cropArea,
    resizeDimensions,
    rotationAngle,
    mask,
  ]);

  useEffect(() => {
    drawImage();
  }, [drawImage]);
};

export default useImageDrawer;
