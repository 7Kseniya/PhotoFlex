import React from 'react';
import styles from './header.module.css';
import logoImg from './../../images/logo.png';
import RedoIcon from '@mui/icons-material/Redo';
import FlipIcon from '@mui/icons-material/Flip';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SaveIcon from '@mui/icons-material/Save';
import { NavLink } from 'react-router-dom';

const Header = ({ canvasRef, setShowOriginal }) => {
  const handleSave = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const imageData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imageData;
      link.download = 'photoflex.png';
      link.click();
    }
  };

  return (
    <div className={styles.mainContainer} data-testid="header">
      <NavLink to={'/'}>
        <img
          src={logoImg || null}
          className={styles.logoContainer}
          alt={'logo'}
        />
      </NavLink>
      <RedoIcon className={`${styles.icon} ${styles.redo}`} />
      <RedoIcon className={`${styles.icon} ${styles.redoRight}`} />
      <FlipIcon
        className={`${styles.icon} ${styles.flip}`}
        onMouseDown={() => setShowOriginal(true)}
        onMouseUp={() => setShowOriginal(false)}
        onMouseLeave={() => setShowOriginal(false)}
        data-testid="flip-icon"
      />
      <SaveIcon
        className={`${styles.icon} ${styles.save}`}
        onClick={handleSave}
      />
      <NavLink to={'/personal-account'}>
        <PersonAddIcon
          className={`${styles.icon} ${styles.personAdd}`}
        />
      </NavLink>
    </div>
  );
};

export default Header;
