import styles from './header.module.css';
import logoImg from './../../images/logo.png';
import RedoIcon from '@mui/icons-material/Redo';
import FlipIcon from '@mui/icons-material/Flip';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SaveIcon from '@mui/icons-material/Save';
import React from 'react';

const Header = () => {
  return (
    <div className={styles.mainContainer}>
      <img src={logoImg} className={styles.logoContainer} />
      <RedoIcon className={`${styles.icon} ${styles.redo}`} />
      <RedoIcon className={`${styles.icon} ${styles.redoRight}`} />
      <FlipIcon className={`${styles.icon} ${styles.flip}`} />
      <SaveIcon className={`${styles.icon} ${styles.save}`} />
      <PersonAddIcon
        className={`${styles.icon} ${styles.personAdd}`}
      />
    </div>
  );
};
export default Header;
