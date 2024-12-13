export const resizeImageToCanvas = (img, maxWidth, maxHeight) => {
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

  return {
    width: Math.round(width),
    height: Math.round(height),
  };
};

export const applyMaskTransformation = (
  ctx,
  mask,
  scale,
  fillStyle,
  compositeOperation
) => {
  if (!mask || mask.length === 0) return;
  ctx.save();
  ctx.globalCompositeOperation = compositeOperation;
  ctx.fillStyle = fillStyle;
  mask.forEach(({ x, y, brushSize }) => {
    ctx.beginPath();
    ctx.arc(x, y, (brushSize / 2) * scale, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();
};

export const applyMaskToImageData = (imageData, mask) => {
  const data = imageData.data;
  const { width } = imageData;

  if (!mask || mask.length === 0) return;

  mask.forEach(({ x, y, brushSize }) => {
    const radiusSquared = (brushSize / 2) ** 2;
    for (let i = 0; i < data.length; i += 4) {
      const pixelX = (i / 4) % width;
      const pixelY = Math.floor(i / 4 / width);
      const distSquared = (pixelX - x) ** 2 + (pixelY - y) ** 2;
      if (distSquared <= radiusSquared) {
        data[i + 3] = 0;
      }
    }
  });
};
