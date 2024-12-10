import { useModal } from '../src/hooks/use-modal';
import { act, renderHook } from '@testing-library/react';

describe('useModal hook', () => {
  it('should initialize with default state', () => {
    const { result } = renderHook(() => useModal());
    expect(result.current.isModalOpen).toBe(false);
    expect(result.current.activeModal).toBe('login');
  });

  it('should open modal with default type', () => {
    const { result } = renderHook(() => useModal());
    act(() => {
      result.current.openModal();
    });
    expect(result.current.isModalOpen).toBe(true);
    expect(result.current.activeModal).toBe('login');
  });

  it('should open modal with specified type', () => {
    const { result } = renderHook(() => useModal());
    act(() => {
      result.current.openModal('register');
    });
    expect(result.current.isModalOpen).toBe(true);
    expect(result.current.activeModal).toBe('register');
  });

  it('should close modal', () => {
    const { result } = renderHook(() => useModal());
    act(() => {
      result.current.openModal();
    });
    act(() => {
      result.current.closeModal();
    });
    expect(result.current.isModalOpen).toBe(false);
  });

  it('should close modal with timeout', async () => {
    const { result } = renderHook(() => useModal());
    act(() => {
      result.current.openModal();
    });
    act(() => {
      result.current.closeModalWithTimeOut();
    });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    expect(result.current.isModalOpen).toBe(true);
  });

  it('should toggle to login modal', () => {
    const { result } = renderHook(() => useModal());
    act(() => {
      result.current.toggleToLogin();
    });
    expect(result.current.activeModal).toBe('login');
  });

  it('should toggle to register modal', () => {
    const { result } = renderHook(() => useModal());
    act(() => {
      result.current.toggleToRegister();
    });
    expect(result.current.activeModal).toBe('register');
  });
});
