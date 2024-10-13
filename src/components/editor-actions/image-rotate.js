import React, { useRef, useEffect } from 'react';

const ImageRotate = ({ imageSrc, rotation }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const image = new Image();

    image.src = imageSrc;
    image.onload = () => {
      const radians = (rotation * Math.PI) / 180;

      const sin = Math.abs(Math.sin(radians));
      const cos = Math.abs(Math.cos(radians));
      const width = image.width;
      const height = image.height;
      const canvasWidth = width * cos + height * sin;
      const canvasHeight = width * sin + height * cos;

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.translate(canvasWidth / 2, canvasHeight / 2);

      ctx.rotate(radians);

      ctx.drawImage(image, -width / 2, -height / 2);

      ctx.setTransform(1, 0, 0, 1, 0, 0);
    };
  }, [imageSrc, rotation]);

  return (
    <div data-testid="image-rotate">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default ImageRotate;
