import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCropArea } from '../../../services/actions/image-actions';
import styles from './crop-tools-styles';

const Crop = () => {
  const dispatch = useDispatch();

  const currentCropArea = useSelector(
    (state) => state.image.cropArea
  );

  const [cropArea, setCropAreaState] = useState({
    x: currentCropArea?.x || 0,
    y: currentCropArea?.y || 0,
  });

  const [localInput, setLocalInput] = useState({
    x: String(currentCropArea?.x || 0),
    y: String(currentCropArea?.y || 0),
  });

  useEffect(() => {
    dispatch(setCropArea(cropArea));
  }, [cropArea, dispatch]);

  useEffect(() => {
    if (currentCropArea) {
      setCropAreaState(currentCropArea);
      setLocalInput({
        x: String(currentCropArea.x),
        y: String(currentCropArea.y),
      });
    }
  }, [currentCropArea]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalInput((prev) => ({ ...prev, [name]: value }));

    const numericValue = value === '' ? '' : Number(value);
    if (!isNaN(numericValue)) {
      setCropAreaState((prev) => ({
        ...prev,
        [name]: numericValue || 0,
      }));
    }
  };

  return (
    <div style={styles.sharedContainer} data-testid="crop-component">
      <div style={styles.dimensionInputContainer}>
        <p style={styles.label}>X: </p>
        <input
          type="number"
          aria-label="X Coordinate"
          name="x"
          style={styles.dimensionInput}
          value={localInput.x}
          onChange={handleInputChange}
        />
        <p style={styles.label}>Y: </p>
        <input
          type="number"
          aria-label="Y Coordinate"
          name="y"
          style={styles.dimensionInput}
          value={localInput.y}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default Crop;
