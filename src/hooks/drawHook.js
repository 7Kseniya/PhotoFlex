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
    if (image && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (showOriginal) {
        canvas.width = originalImage.width;
        canvas.height = originalImage.height;
        ctx.drawImage(
          originalImage,
          0,
          0,
          originalImage.width,
          originalImage.height
        );
      } else {

        ctx.save();

        const cropX = cropArea?.x || 0;
        const cropY = cropArea?.y || 0;

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        const finalWidth = resizeDimensions.width - cropX;
        const finalHeight = resizeDimensions.height - cropY;

        canvas.width = finalWidth;
        canvas.height = finalHeight;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.translate(centerX, centerY);
        ctx.rotate((rotationAngle * Math.PI) / 180);
        ctx.translate(-centerX, -centerY);
        ctx.filter = filters[filter] || 'none';

        ctx.drawImage(
          image,
          cropX,
          cropY,
          image.width - cropX,
          image.height - cropY,
          0,
          0,
          finalWidth,
          finalHeight
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
