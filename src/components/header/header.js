import React, { useState } from 'react';
import styles from './header.module.css';
import logoImg from './../../images/logo.png';
import RedoIcon from '@mui/icons-material/Redo';
import FlipIcon from '@mui/icons-material/Flip';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SaveIcon from '@mui/icons-material/Save';
import { NavLink } from 'react-router-dom';
import { saveAs } from 'file-saver';
import {
  redo,
  setShowOriginal,
  undo,
} from '../../services/actions/image-actions';
import { useDispatch } from 'react-redux';

const Header = ({ canvasRef }) => {
  const dispatch = useDispatch();
  const [selectedFormat, setSelectedFormat] = useState('png');
  const handleSave = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const format = selectedFormat.toLowerCase();
      if (format === 'svg') {
        const svgContent = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}">
          <foreignObject width="100%" height="100%">
            <div xmlns="http://www.w3.org/1999/xhtml" style="width:${canvas.width}px;height:${canvas.height}px;">
              <img src="${canvas.toDataURL('image/png')}" style="width:100%;height:100%;" alt=" "/>
            </div>
          </foreignObject>
        </svg>
      `;
        const blob = new Blob([svgContent], {
          type: 'image/svg+xml;charset=utf-8',
        });
        saveAs(blob, 'photoflex.svg');
      } else {
        const imageData = canvas.toDataURL(`image/${format}`);
        const link = document.createElement('a');
        link.href = imageData;
        link.download = `photoflex.${format}`;
        link.click();
      }
    }
  };
  const handleUndo = () => {
    dispatch(undo());
  };

  const handleRedo = () => {
    dispatch(redo());
  };
  return (
    <div className={styles.mainContainer} data-testid="header">
      <NavLink to={'/'}>
        <img
          src={logoImg}
          className={styles.logoContainer}
          alt={'logo'}
        />
      </NavLink>
      <RedoIcon
        className={`${styles.icon} ${styles.redo}`}
        onClick={handleUndo}
        data-testid="undo-icon"
      />
      <RedoIcon
        className={`${styles.icon} ${styles.redoRight}`}
        onClick={handleRedo}
        data-testid="redo-icon"
      />
      <FlipIcon
        className={`${styles.icon} ${styles.flip}`}
        onMouseDown={() => dispatch(setShowOriginal(true))}
        onMouseUp={() => dispatch(setShowOriginal(false))}
        onMouseLeave={() => dispatch(setShowOriginal(false))}
        data-testid="flip-icon"
      />
      <div className={styles.saveContainer}>
        <select
          value={selectedFormat}
          onChange={(e) => setSelectedFormat(e.target.value)}
          className={styles.formatSelect}
        >
          <option value="png">PNG</option>
          <option value="jpeg">JPEG</option>
          <option value="jpg">JPG</option>
          <option value="webp">WEBP</option>
          <option value="svg">SVG</option>
        </select>
        <SaveIcon
          className={`${styles.icon} ${styles.save}`}
          onClick={handleSave}
          data-testid={'save-icon'}
        />
      </div>
      <NavLink to={'/personal-account'}>
        <PersonAddIcon
          data-testid="PersonAddIcon"
          className={`${styles.icon} ${styles.personAdd}`}
        />
      </NavLink>
    </div>
  );
};

export default Header;
