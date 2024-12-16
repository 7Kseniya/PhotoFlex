import React from 'react';
import Modal from '../modal/modal';
import LoginModal from '../modal/login-modal/login-modal';
import RegisterModal from '../modal/register-modal/register-modal';

const AuthModal = ({
  isModalOpen,
  activeModal,
  onClose,
  toggleToLogin,
  toggleToRegister,
  closeModalWithTimeOut,
}) => {
  if (!isModalOpen) return null;

  return (
    <Modal onClose={onClose} data-testid="auth-modal">
      {activeModal === 'login' && (
        <LoginModal
          onSignUpClick={toggleToRegister}
          onSubmited={closeModalWithTimeOut}
        />
      )}
      {activeModal === 'register' && (
        <RegisterModal
          onSignInClick={toggleToLogin}
          onSubmited={closeModalWithTimeOut}
        />
      )}
    </Modal>
  );
};

export default AuthModal;
