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
import { setCropDimensions } from '../../../services/actions/image-actions';
import styles from './crop-tools-styles';
import { useSelector } from 'react-redux';

const Crop = () => {
  const dispatch = useDispatch();
  const [dimensions, setDimensions] = useState({
    width: '',
    height: '',
  });
  const cropDimensions = useSelector(
    (state) => state.image.cropDimensions
  );

  useEffect(() => {
    setDimensions({
      width: cropDimensions.width,
      height: cropDimensions.height,
    });
  }, [cropDimensions]);

  const cropPresets = [
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

  const handleCropPreset = (width, height) => {
    setDimensions({ width, height });
    dispatch(setCropDimensions(width, height));
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
        setCropDimensions(
          updatedDimensions.width || 0,
          updatedDimensions.height || 0
        )
      );
    }
  };

  return (
    <div style={styles.sharedContainer} data-testid="crop-component">
      <div style={styles.dimensionInputContainer}>
        <p style={styles.label}>Width: </p>
        <input
          type="number"
          aria-label="Width"
          name="width"
          style={styles.dimensionInput}
          data-testid="crop-width"
          value={dimensions.width}
          onChange={handleInputChange}
        />
        <p style={styles.label}>Height: </p>
        <input
          type="number"
          aria-label="Height"
          name="height"
          style={styles.dimensionInput}
          data-testid="crop-height"
          value={dimensions.height}
          onChange={handleInputChange}
        />
      </div>
      {cropPresets.map((cropItem, index) => {
        const CropComponent = cropItem.component;
        return (
          <div
            key={index}
            style={styles.cropItemStyle}
            onClick={() =>
              handleCropPreset(cropItem.width, cropItem.height)
            }
            data-testid={`crop-${cropItem.name}`}
          >
            <CropComponent style={styles.cropIconStyle} />
            <p style={styles.label}>{cropItem.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Crop;
