import React, { useState } from 'react';
import {
  Crop169,
  Crop32,
  Crop54,
  Crop75,
  CropSquare,
} from '@mui/icons-material';

const styles = {
  cropItemStyle: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    flexDirection: 'row',
  },
  label: {
    color: 'white',
    fontSize: '25px',
    textAlign: 'center',
    marginLeft: '10px',
  },
  sharedContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginTop: '20px',
    alignItems: 'center',
    height: '980px',
    overflowY: 'scroll',
  },
  cropIconStyle: {
    fontSize: '80px',
    color: 'white',
    cursor: 'pointer',
  },
  dimensionInputContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '10px',
  },
  dimensionInput: {
    padding: '5px',
    fontSize: '30px',
    border: '2px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#1e1e1e',
    color: 'white',
    outline: 'none',
    width: '100px',
    transition: '0.2s',
    marginTop: '10px',
  },
};

const Crop = ({ onCropChange }) => {
  const cropPresets = [
    { component: Crop169, name: '16:9', width: 400, height: 225 },
    { component: CropSquare, name: '4:4', width: 250, height: 250 },
    { component: Crop169, name: '9:16', width: 225, height: 400 },
    { component: Crop32, name: '3:2', width: 375, height: 250 },
    { component: Crop54, name: '5:4', width: 312, height: 250 },
    { component: Crop75, name: '7:5', width: 400, height: 250 },
  ];

  const [dimensions, setDimensions] = useState({
    cropX: 0,
    cropY: 0,
    cropWidth: 1000,
    cropHeight: 1000,
  });

  const handlePresetSelect = (width, height) => {
    setDimensions((prev) => ({
      ...prev,
      cropWidth: width,
      cropHeight: height,
    }));
    onCropChange({
      cropX: 0,
      cropY: 0,
      cropWidth: width,
      cropHeight: height,
    });
  };

  return (
    <div style={styles.sharedContainer} data-testid="crop-area">
      <div style={styles.dimensionInputContainer}>
        <input
          type="number"
          aria-label="Width"
          name="width"
          value={dimensions.cropWidth}
          onChange={(e) => {
            const width = Math.max(0, e.target.value);
            handlePresetSelect(width, dimensions.cropHeight);
          }}
          style={styles.dimensionInput}
        />
        <p style={styles.label}>Width: </p>
        <input
          type="number"
          aria-label="Height"
          name="height"
          value={dimensions.cropHeight}
          onChange={(e) => {
            const height = Math.max(0, e.target.value);
            handlePresetSelect(dimensions.cropWidth, height);
          }}
          style={styles.dimensionInput}
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
