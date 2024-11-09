import { styles } from './login-modal-styles';
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

const LoginModal = ({ onSignUpClick, onSubmited }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
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
    setAlert('login succesful');
    setShowAlert(true);

    console.log('login: ', login);
    console.log('password: ', password);

    if (onSubmited) {
      onSubmited();
    }

    setLogin('');
    setPassword('');
    setShowAlert(false);
  };

  return (
    <div style={styles.mainContainer}>
      <DialogTitle sx={styles.modalTitle}>sign in</DialogTitle>
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
              Enter your password
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
              don&apos;t have an account?
            </span>
            <Button onClick={onSignUpClick} sx={styles.btn}>
              sign up
            </Button>
          </Stack>
          <Stack sx={styles.footerStack} direction="row" spacing={1}>
            <Button
              sx={styles.btn}
              onClick={() => {
                /*redirect to recover password form*/
              }}
            >
              recover password
            </Button>
          </Stack>
        </Stack>
      </form>
    </div>
  );
};
export default LoginModal;
