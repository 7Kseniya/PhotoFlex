import { styles } from './register-modal-styles';
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

const RegisterModal = ({ onSignInClick, onSubmited }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleClickShowPassword = () =>
    setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  const validateLogin = (login) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\+?[1-9]\d{1,14}$/;
    return (
      emailPattern.test(login) ||
      (phonePattern.test(login) && login.length > 0)
    );
  };

  const validatePassword = (password) => {
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordPattern.test(password);
  };
  const validateUsername = (username) => {
    const usernamePattern = /^[a-zA-Z0-9_]{5,15}$/;
    return usernamePattern.test(username);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setShowAlert(false);
    setAlert('');

    if (!validateLogin(login)) {
      setAlert('please enter valid email or phone number');
      setShowAlert(true);
      return;
    }
    if (!validatePassword(password)) {
      setAlert('password must be at least 8 characters long');
      setShowAlert(true);
      return;
    }
    if (!validateUsername(username)) {
      setAlert(
        'username must be 5-15 characters long and can only contain letters, numbers, and underscores'
      );
      setShowAlert(true);
      return;
    }
    setAlert('register succesful');
    setShowAlert(true);

    console.log('login: ', login);
    console.log('password: ', password);
    console.log('username: ', username);

    if (onSubmited) {
      onSubmited();
    }

    setLogin('');
    setPassword('');
    setUsername('');
    setShowAlert(false);
  };

  return (
    <div style={styles.mainContainer}>
      <DialogTitle sx={styles.modalTitle}>sign up</DialogTitle>
      <form>
        <Stack spacing={2} sx={styles.stack}>
          <FormControl variant="outlined">
            <InputLabel htmlFor="login-input" sx={styles.inputLabel}>
              Enter your phone number/email/login
            </InputLabel>
            <OutlinedInput
              required
              id="login-input"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
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
              required
              id="password-input"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              id="username-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              label="Username"
              sx={styles.userInputStyle}
            />
          </FormControl>
          {showAlert && (
            <Alert
              severity="warning"
              onClose={() => {
                console.log('Alert closed');
                setShowAlert(false);
              }}
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
            <Button variant="outlined" sx={styles.socialBtn}>
              <GoogleIcon />
            </Button>
            <Button variant="outlined" sx={styles.socialBtn}>
              <TelegramIcon />
            </Button>
          </Stack>
          <Stack sx={styles.footerStack} direction="row" spacing={1}>
            <span style={styles.footerText}>
              already have an account?
            </span>
            <Button sx={styles.btn} onClick={onSignInClick}>
              sign in
            </Button>
          </Stack>
          <Stack
            sx={styles.footerStack}
            direction="row"
            spacing={1}
          ></Stack>
        </Stack>
      </form>
    </div>
  );
};
export default RegisterModal;
