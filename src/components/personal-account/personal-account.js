import styles from './personal-account.module.css';
import logoImg from '../../images/logo.png';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PersonalAccount = () => {
  const navigate = useNavigate();
  const goToHome = () => {
    navigate('/');
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.accHeader}>
        <img
          src={logoImg}
          className={styles.logoContainer}
          onClick={goToHome}
          style={{ cursor: 'pointer' }}
          alt={'Logo'}
        />
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
