import React, { useState } from 'react';
import styles from './upload-container.module.css';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PropTypes from 'prop-types';

const UploadContainer = ({ onImageUpload }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      readFile(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      readFile(file);
    }
  };

  const readFile = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      onImageUpload(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      className={`${styles.mainContainer} ${isDragOver ? styles.dragOver : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <p className={styles.uploadText}>choose or drag file</p>
      <input
        type="file"
        accept="image/*"
        id="fileInput"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />
      <label htmlFor="fileInput" className={styles.uploadLabel}>
        <CloudUploadIcon className={styles.uploadIcon} />
      </label>
    </div>
  );
};

UploadContainer.propTypes = {
  onImageUpload: PropTypes.func.isRequired,
};

export default UploadContainer;
