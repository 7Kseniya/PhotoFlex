import React, { useRef, useEffect } from 'react';

const ImageCrop = ({
  imageSrc,
  cropX,
  cropY,
  cropWidth,
  cropHeight,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.src = imageSrc;

    image.onload = () => {
      canvas.width = cropWidth;
      canvas.height = cropHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        image,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
      );
    };
  }, [imageSrc, cropX, cropY, cropWidth, cropHeight]);

  return (
    <div data-testid="image-crop">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default ImageCrop;
