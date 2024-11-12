import React from 'react';
import styles from './header.module.css';
import logoImg from './../../images/logo.png';
import RedoIcon from '@mui/icons-material/Redo';
import FlipIcon from '@mui/icons-material/Flip';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SaveIcon from '@mui/icons-material/Save';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <div className={styles.mainContainer}>
      <NavLink to={'/'}>
        <img
          src={logoImg || null}
          className={styles.logoContainer}
          alt={'logo'}
        />
      </NavLink>
      <RedoIcon className={`${styles.icon} ${styles.redo}`} />
      <RedoIcon className={`${styles.icon} ${styles.redoRight}`} />
      <FlipIcon className={`${styles.icon} ${styles.flip}`} />
      <SaveIcon className={`${styles.icon} ${styles.save}`} />
      <NavLink to={'/personal-account'}>
        <PersonAddIcon
          className={`${styles.icon} ${styles.personAdd}`}
        />
      </NavLink>
    </div>
  );
};

export default Header;
