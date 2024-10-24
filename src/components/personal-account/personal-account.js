import styles from './personal-account.module.css';
import logoImg from '../../images/logo.png';
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PersonalAccount = () => {
  const navigate = useNavigate();
  const goToHome = () => {
    navigate('/');
  };
  const [userName, setUserName] = useState('Username');
  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };
  const handleNameChange = (event) => {
    setUserName(event.target.value);
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.accHeader}>
        <img
          src={logoImg}
          className={styles.logoContainer}
          onClick={goToHome}
          alt={'Logo'}
        />
        <EditIcon
          className={`${styles.icon} ${styles.edit}`}
          onClick={handleEditClick}
        />
      </div>
      <div className={styles.userContainer}>
        <div className={styles.editSection}>
          {isEditing ? (
            <>
              <input
                type="text"
                value={userName}
                onChange={handleNameChange}
                className={styles.nameInput}
              />
              <EditIcon
                className={styles.editIcon}
                onClick={handleEditClick}
              />
            </>
          ) : (
            <p className={styles.userName}>{userName}</p>
          )}
        </div>
      </div>
      <section className={styles.photosContainer}>
        <div className={styles.photo}></div>
        <div className={styles.photo}></div>
        <div className={styles.photo}></div>
      </section>
    </div>
  );
};
export default PersonalAccount;
