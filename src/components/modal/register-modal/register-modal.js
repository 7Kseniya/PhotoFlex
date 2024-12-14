import React, { useState } from 'react';
import {
  DialogTitle,
  Stack,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  Alert,
} from '@mui/material';
import FormControl from '@mui/joy/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import TelegramIcon from '@mui/icons-material/Telegram';
import {
  handleMouseDownPassword,
  handleMouseUpPassword,
  validateLogin,
  validatePassword,
  validateUsername,
} from '../../../utils/auth-utils';
import { useDispatch, useSelector } from 'react-redux';
import {
  registerUser,
  setLoginRegister,
  setPasswordRegister,
  setUsername,
} from '../../../services/actions/auth-actions';
import { styles } from './register-modal-styles';

const RegisterModal = ({ onSignInClick, onSubmited }) => {
  const dispatch = useDispatch();
  const { loginRegister, passwordRegister, username } = useSelector(
    (state) => state.auth
  );
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleClickShowPassword = () =>
    setShowPassword((show) => !show);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowAlert(false);
    setAlert('');

    if (!validateLogin(loginRegister)) {
      setAlert('please enter valid email or phone number');
      setShowAlert(true);
      return;
    }
    if (!validatePassword(passwordRegister)) {
      setAlert('password must be at least 8 characters long');
      setShowAlert(true);
      return;
    }
    if (!validateUsername(username)) {
      setAlert(
        'username must be 5-20 characters long and can only contain letters, numbers, and underscores'
      );
      setShowAlert(true);
      return;
    }
    try {
      await dispatch(
        registerUser(loginRegister, username, passwordRegister)
      );
      onSubmited();
      console.log('диспатч есть');
      setAlert('Register successful');
      setShowAlert(true);
      dispatch(setLoginRegister(''));
      dispatch(setPasswordRegister(''));
      dispatch(setUsername(''));
      setShowAlert(false);
    } catch (error) {
      setAlert('Registration failed. Please try again.');
      setShowAlert(true);
    }
  };

  return (
    <div style={styles.mainContainer} data-testid="register-modal">
      <DialogTitle data-testid="sign-up-title" sx={styles.modalTitle}>
        sign up
      </DialogTitle>
      <form>
        <Stack spacing={2} sx={styles.stack}>
          <FormControl variant="outlined">
            <InputLabel htmlFor="login-input" sx={styles.inputLabel}>
              Enter your phone number/email/login
            </InputLabel>
            <OutlinedInput
              data-testid="login-input"
              required
              id="login-input"
              value={loginRegister}
              onChange={(e) =>
                dispatch(setLoginRegister(e.target.value))
              }
              label="Login"
              sx={styles.loginInputStyle}
            />
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel
              htmlFor="password-input"
              sx={styles.inputLabel}
            >
              Come up with a password
            </InputLabel>
            <OutlinedInput
              data-testid="password-input"
              required
              id="password-input"
              type={showPassword ? 'text' : 'password'}
              value={passwordRegister}
              onChange={(e) =>
                dispatch(setPasswordRegister(e.target.value))
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                    sx={styles.visability}
                  >
                    {showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              sx={styles.passwordInputStyle}
            />
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel
              htmlFor="username-input"
              sx={styles.inputLabel}
            >
              Come up with username
            </InputLabel>
            <OutlinedInput
              required
              data-testid="username-input"
              id="username-input"
              value={username}
              onChange={(e) => dispatch(setUsername(e.target.value))}
              label="Username"
              sx={styles.userInputStyle}
            />
          </FormControl>
          {showAlert && (
            <Alert
              severity="warning"
              onClose={() => setShowAlert(false)}
            >
              {alert}
            </Alert>
          )}

          <Button
            type="submit"
            sx={styles.btn}
            onClick={handleSubmit}
          >
            submit
          </Button>
          <span style={styles.loginvia}>login via:</span>
          <Stack
            direction="row"
            spacing={1}
            sx={styles.footerStack}
            marginBottom="5px"
          >
            <Button
              data-testid="social-btn-google"
              variant="outlined"
              sx={styles.socialBtn}
            >
              <GoogleIcon />
            </Button>
            <Button
              data-testid="social-btn-telegram"
              variant="outlined"
              sx={styles.socialBtn}
            >
              <TelegramIcon />
            </Button>
          </Stack>
          <Stack sx={styles.footerStack} direction="row" spacing={1}>
            <span style={styles.footerText}>
              already have an account?
            </span>
            <Button
              sx={styles.btn}
              onClick={onSignInClick}
              data-testid="signin-link"
            >
              sign in
            </Button>
          </Stack>
        </Stack>
      </form>
    </div>
  );
};

export default RegisterModal;
