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

const Crop = () => {
  const crop = [
    { component: Crop169, name: '16:9' },
    { component: CropSquare, name: '4:4' },
    { component: Crop169, name: '9:16' },
    { component: Crop32, name: '3:2' },
    { component: Crop54, name: '5:4' },
    { component: Crop75, name: '7:5' },
  ];

  const [dimensions, setDimensions] = useState({
    width: '',
    height: '',
  });

  const handleDimensionChange = (e) => {
    const { name, value } = e.target;
    const newValue = Math.max(0, value);
    setDimensions((prevDimensions) => ({
      ...prevDimensions,
      [name]: newValue,
    }));
  };

  return (
    <div style={styles.sharedContainer } data-testid="crop-area">
      <div style={styles.dimensionInputContainer}>
        <label style={styles.label}>
          Width:
          <input
            type="number"
            name="width"
            value={dimensions.width}
            onChange={handleDimensionChange}
            style={styles.dimensionInput}
          />
        </label>
        <label style={styles.label}>
          Height:
          <input
            type="number"
            name="height"
            value={dimensions.height}
            onChange={handleDimensionChange}
            style={styles.dimensionInput}
          />
        </label>
      </div>
      {crop.map((cropItem, index) => {
        const CropComponent = cropItem.component;
        return (
          <div key={index} style={styles.cropItemStyle}>
            <CropComponent style={styles.cropIconStyle} className={cropItem.className} />
            <p style={styles.label}>{cropItem.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Crop;
