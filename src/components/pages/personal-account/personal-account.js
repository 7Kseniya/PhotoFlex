import styles from './personal-account.module.css';
import logoImg from '../../../images/logo.png';
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const PersonalAccount = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    phone: '+7 999 999 99 99',
    email: 'username52@gmal.com',
    telegram: '@username666',
    userName: 'Username',
  });
  const { userName } = userData;
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({
    phone: '',
    email: '',
  });

  const goToHome = () => {
    navigate('/');
  };

  const handleEditClick = () => {
    if (errors.phone || errors.email) {
      return;
    }
    setIsEditing((prev) => !prev);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'phone') {
      const phonePattern = /^\+7 \d{3} \d{3} \d{2} \d{2}$/;
      if (!phonePattern.test(value)) {
        setErrors((prev) => ({
          ...prev,
          phone: 'Неверный формат номера',
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          phone: '',
          email: prev.email || '',
        }));
      }
      const formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length === 11) {
        setUserData((prevData) => ({
          ...prevData,
          phone: `+7 ${formattedValue.slice(1, 4)} ${formattedValue.slice(4, 7)} ${formattedValue.slice(7, 9)} ${formattedValue.slice(9, 11)}`,
        }));
        return;
      }
    }
    if (name === 'email') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        setErrors((prev) => ({
          ...prev,
          email: 'Неверный формат email',
        }));
      } else {
        setErrors((prev) => ({ ...prev, email: '' }));
      }
    }
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.accHeader}>
        <img
          src={logoImg || null}
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
        <div
          className={`${styles.editSection} ${isEditing ? styles.editing : ''}`}
        >
          {isEditing ? (
            <input
              type="text"
              name="userName"
              value={userName}
              placeholder="name"
              onChange={handleChange}
              maxLength={30}
              className={styles.nameInput}
            />
          ) : (
            <span className={styles.userName}>{userName}</span>
          )}
        </div>
        <div
          className={`${styles.dataContainer} ${isEditing ? styles.editing : ''}`}
        >
          {['phone', 'email', 'telegram'].map((field) => (
            <div key={field} className={styles.dataRow}>
              <span>{`${field}:`}</span>
              <input
                type="text"
                name={field}
                value={userData[field]}
                placeholder={field}
                onChange={handleChange}
                className={`${styles.inputsData} ${field === 'email' && isEditing ? styles.emailInput : ''}`}
                maxLength={
                  field === 'email'
                    ? 35
                    : field === 'telegram'
                      ? 20
                      : undefined
                }
                disabled={!isEditing}
              />
              {errors[field] && (
                <span className={styles.error}>{errors[field]}</span>
              )}
            </div>
          ))}
        </div>
      </div>
      <section className={styles.photosContainer}>
        <ArrowBackIosIcon
          style={{ fontSize: '50px', color: 'white' }}
        />
        {[...Array(3)].map((_, index) => (
          <div key={index} className={styles.photo}></div>
        ))}
        <ArrowForwardIosIcon
          style={{ fontSize: '50px', color: 'white' }}
        />
      </section>
    </div>
  );
};

export default PersonalAccount;
