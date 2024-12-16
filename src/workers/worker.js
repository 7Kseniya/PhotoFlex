import {
  validateLogin,
  validatePassword,
  validateUsername,
} from '../utils/auth-utils.js';

self.onmessage = (e) => {
  if (!e.data) {
    return;
  }

  const { type, payload } = e.data;
  let result;

  switch (type) {
    case 'validateLogin':
      result = validateLogin(payload.login);
      break;
    case 'validatePassword':
      result = validatePassword(payload.password);
      break;
    case 'validateUsername':
      result = validateUsername(payload.username);
      break;
    default:
      result = null;
      break;
  }

  self.postMessage(result);
};
