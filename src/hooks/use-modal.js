import { useState, useCallback } from 'react';

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState('login');

  const openModal = useCallback((modalType = 'login') => {
    setActiveModal(modalType);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);
  const closeModalWithTimeOut = useCallback(() => {
    setTimeout(() => {
      setIsModalOpen(false);
    }, 2000);
  }, []);
  const toggleToLogin = useCallback(() => {
    setActiveModal('login');
  }, []);

  const toggleToRegister = useCallback(() => {
    setActiveModal('register');
  }, []);

  return {
    isModalOpen,
    activeModal,
    openModal,
    closeModal,
    toggleToLogin,
    toggleToRegister,
    closeModalWithTimeOut,
  };
};
