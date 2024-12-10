export const validateLogin = (login) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^\+?[1-9]\d{1,14}$/;
  return (
    emailPattern.test(login) ||
    (phonePattern.test(login) && login.length > 0)
  );
};

export const validatePassword = (password) => {
  return password.length >= 8;
};
export const validateUsername = (username) => {
  const usernamePattern = /^[a-zA-Z0-9_]{5,20}$/;
  return usernamePattern.test(username);
};
export const handleMouseDownPassword = (event) => {
  event.preventDefault();
};
export const handleMouseUpPassword = (event) => {
  event.preventDefault();
};
