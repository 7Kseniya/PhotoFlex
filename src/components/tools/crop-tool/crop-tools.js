import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Crop169,
  Crop32,
  Crop54,
  Crop75,
  CropSquare,
} from '@mui/icons-material';
import { setCrop } from '../../../services/actions/image-actions';
import styles from './crop-tools-styles';
const Crop = () => {
  const dispatch = useDispatch();
  const crop = useSelector((state) => state.crop);
  const cropPresets = [
    { component: Crop169, name: '16:9', width: 400, height: 225 },
    { component: CropSquare, name: '4:4', width: 250, height: 250 },
    { component: Crop169, name: '9:16', width: 225, height: 400 },
    { component: Crop32, name: '3:2', width: 375, height: 250 },
    { component: Crop54, name: '5:4', width: 312, height: 250 },
    { component: Crop75, name: '7:5', width: 400, height: 250 },
  ];
  const handlePresetSelect = (width, height) => {
    dispatch(
      setCrop({
        cropX: 0,
        cropY: 0,
        cropWidth: width,
        cropHeight: height,
      })
    );
  };
  const handleInputChange = (e, type) => {
    const value = Math.max(0, e.target.value);
    dispatch(
      setCrop({
        ...crop,
        [type]: value,
      })
    );
  };

  return (
    <div style={styles.sharedContainer} data-testid="crop-area">
      <div style={styles.dimensionInputContainer}>
        <input
          type="number"
          aria-label="Width"
          name="width"
          value={crop.cropWidth}
          onChange={(e) => handleInputChange(e, 'cropWidth')}
          style={styles.dimensionInput}
          data-testid="crop-width"
        />
        <p style={styles.label}>Width: </p>
        <input
          type="number"
          aria-label="Height"
          name="height"
          value={crop.cropHeight}
          onChange={(e) => handleInputChange(e, 'cropHeight')}
          style={styles.dimensionInput}
          data-testid="crop-height"
        />
        <p style={styles.label}>Height: </p>
      </div>
      {cropPresets.map((cropItem, index) => {
        const CropComponent = cropItem.component;
        return (
          <div
            key={index}
            style={styles.cropItemStyle}
            onClick={() =>
              handlePresetSelect(cropItem.width, cropItem.height)
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
