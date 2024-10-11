import styles from './personal-account.module.css';
import logoImg from '../../images/logo.png';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';

const PersonalAccount = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.accHeader}>
        <img src={logoImg} className={styles.logoContainer} />
        <EditIcon className={`${styles.icon} ${styles.edit}`} />
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
