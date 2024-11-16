import React, { useEffect, useState } from 'react';
import {
  Crop169,
  Crop32,
  Crop54,
  Crop75,
  CropPortrait,
  CropSquare,
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { setResizeDimensions } from '../../../services/actions/image-actions';
import styles from './resize-tools-styles';
import { useSelector } from 'react-redux';

const Resize = () => {
  const dispatch = useDispatch();
  const [dimensions, setDimensions] = useState({
    width: '',
    height: '',
  });
  const resizeDimensions = useSelector(
    (state) => state.image.resizeDimensions
  );

  useEffect(() => {
    setDimensions({
      width: resizeDimensions.width,
      height: resizeDimensions.height,
    });
  }, [resizeDimensions]);

  const resizePresets = [
    { component: Crop169, name: '16:9', width: 900, height: 506 },
    { component: CropSquare, name: '4:4', width: 600, height: 600 },
    {
      component: CropPortrait,
      name: '9:16',
      width: 506,
      height: 900,
    },
    { component: Crop32, name: '3:2', width: 750, height: 500 },
    { component: Crop54, name: '5:4', width: 624, height: 500 },
    { component: Crop75, name: '7:5', width: 800, height: 500 },
  ];

  const handleResizePreset = (width, height) => {
    setDimensions({ width, height });
    dispatch(setResizeDimensions(width, height));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numericValue = value === '' ? null : Number(value);

    setDimensions((prev) => ({ ...prev, [name]: numericValue }));

    if (numericValue !== null && numericValue !== undefined) {
      const updatedDimensions = {
        ...dimensions,
        [name]: numericValue,
      };
      dispatch(
        setResizeDimensions(
          updatedDimensions.width || 0,
          updatedDimensions.height || 0
        )
      );
    }
  };

  return (
    <div
      style={styles.sharedContainer}
      data-testid="resize-component"
    >
      <div style={styles.dimensionInputContainer}>
        <p style={styles.label}>Width: </p>
        <input
          type="number"
          aria-label="Width"
          name="width"
          style={styles.dimensionInput}
          data-testid="resize-width"
          value={dimensions.width}
          onChange={handleInputChange}
        />
        <p style={styles.label}>Height: </p>
        <input
          type="number"
          aria-label="Height"
          name="height"
          style={styles.dimensionInput}
          data-testid="resize-height"
          value={dimensions.height}
          onChange={handleInputChange}
        />
      </div>
      {resizePresets.map((resizeItem, index) => {
        const ResizeComponent = resizeItem.component;
        return (
          <div
            key={index}
            style={styles.cropItemStyle}
            onClick={() =>
              handleResizePreset(resizeItem.width, resizeItem.height)
            }
            data-testid={`resize-${resizeItem.name}`}
          >
            <ResizeComponent style={styles.cropIconStyle} />
            <p style={styles.label}>{resizeItem.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Resize;
