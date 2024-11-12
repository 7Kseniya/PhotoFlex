import styles from './personal-account.module.css';
import logoImg from '../../../images/logo.png';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';
import { NavLink } from 'react-router-dom';

const PersonalAccount = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.accHeader}>
        <NavLink to={'/'}>
          <img
            src={logoImg || null}
            className={styles.logoContainer}
            alt={''}
          />
        </NavLink>
        <EditIcon
          className={`${styles.icon} ${styles.edit}`}
          data-testid="edit-icon"
        />
      </div>
      <div className={styles.userContainer}></div>
      <section className={styles.photosContainer}>
        <div className={styles.photo}></div>
        <div className={styles.photo}></div>
        <div className={styles.photo}></div>
      </section>
    </div>
  );
};
export default PersonalAccount;
