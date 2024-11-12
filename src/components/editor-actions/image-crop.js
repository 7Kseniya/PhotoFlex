import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setImageSrc } from '../../services/actions/image-actions';

const ImageCrop = () => {
  const canvasRef = useRef(null);
  const dispatch = useDispatch();
  const { crop, imageSrc } = useSelector((state) => ({
    crop: state.crop,
    imageSrc: state.imageSrc,
  }));
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      canvas.width = crop.cropWidth;
      canvas.height = crop.cropHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        image,
        crop.cropX,
        crop.cropY,
        crop.cropWidth,
        crop.cropHeight,
        0,
        0,
        crop.cropWidth,
        crop.cropHeight
      );
      const croppedImageSrc = canvas.toDataURL('image/png');
      dispatch(setImageSrc(croppedImageSrc));
    };
  }, [imageSrc, crop, dispatch]);
  return (
    <div data-testid="image-crop-container">
      <canvas ref={canvasRef} data-testid="image-crop" />
    </div>
  );
};

export default ImageCrop;
