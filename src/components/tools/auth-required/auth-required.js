import React from 'react';
import styles from './auth-required.module.css';
import AuthModal from '../../modal/auth-modal';
import { useModal } from '../../../hooks/use-modal';
import { useSelector } from 'react-redux';

const AuthRequired = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const {
    isModalOpen,
    activeModal,
    openModal,
    closeModal,
    toggleToLogin,
    toggleToRegister,
    closeModalWithTimeOut,
  } = useModal();
  if (isAuth) return null;
  return (
    <div className={styles.container} data-testid="auth-modal">
      <p>
        Вы должны авторизироваться для использования этого
        инструмента.
      </p>
      <button
        className={styles.button}
        onClick={() => openModal('login')}
      >
        Авторизироваться
      </button>
      <AuthModal
        isModalOpen={isModalOpen}
        activeModal={activeModal}
        onClose={closeModal}
        toggleToLogin={toggleToLogin}
        toggleToRegister={toggleToRegister}
        closeModalWithTimeOut={closeModalWithTimeOut}
      />
    </div>
  );
};

export default AuthRequired;
