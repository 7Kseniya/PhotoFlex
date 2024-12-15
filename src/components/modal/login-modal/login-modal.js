import React, { useState, useEffect, useRef } from 'react';
import { styles } from './login-modal-styles';
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
import { useDispatch, useSelector } from 'react-redux';
import {
  loginUser,
  setLogin,
  setPassword,
} from '../../../services/actions/auth-actions';
import {
  handleMouseDownPassword,
  handleMouseUpPassword,
} from '../../../utils/auth-utils';

const LoginModal = ({ onSignUpClick, onSubmited }) => {
  const dispatch = useDispatch();
  const { login, password } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const workerRef = useRef(null);

  useEffect(() => {
    const w = new Worker(
      new URL('../../../workers/worker.js', import.meta.url)
    );
    workerRef.current = w;

    return () => {
      w.terminate();
    };
  }, []);

  const handleClickShowPassword = () =>
    setShowPassword((show) => !show);

  const validateWithWorker = (type, payload) => {
    return new Promise((resolve) => {
      if (!workerRef.current) {
        resolve(null);
        return;
      }

      const handleMessage = (e) => {
        workerRef.current.removeEventListener(
          'message',
          handleMessage
        );
        resolve(e.data);
      };

      workerRef.current.addEventListener('message', handleMessage);
      workerRef.current.postMessage({ type, payload });
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowAlert(false);
    setAlert('');

    const isLoginValid = await validateWithWorker('validateLogin', {
      login,
    });
    if (!isLoginValid) {
      setAlert('Please enter a valid email or phone number');
      setShowAlert(true);
      return;
    }

    const isPasswordValid = await validateWithWorker(
      'validatePassword',
      { password }
    );
    if (!isPasswordValid) {
      setAlert('Password must be at least 8 characters long');
      setShowAlert(true);
      return;
    }

    try {
      await dispatch(loginUser(login, password));
      onSubmited();
      setAlert('Login successful!');
      setShowAlert(true);
      dispatch(setLogin(''));
      dispatch(setPassword(''));
    } catch (error) {
      setAlert(error.message || 'An error occurred during login');
      setShowAlert(true);
    }
  };

  return (
    <div style={styles.mainContainer} data-testid="login-modal">
      <DialogTitle data-testid="sign-in-title" sx={styles.modalTitle}>
        sign in
      </DialogTitle>
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
              onChange={(e) => dispatch(setLogin(e.target.value))}
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
              onChange={(e) => dispatch(setPassword(e.target.value))}
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
              data-testid="alert-login"
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
            <Button
              variant="outlined"
              sx={styles.socialBtn}
              data-testid="social-btn-google"
            >
              <GoogleIcon />
            </Button>
            <Button
              data-testid="social-btn-telegram"
              variant="outlined"
              sx={styles.socialBtn}
              onClick={() => {
                window.TelegramLoginWidget.showFrame({
                  bot_id: '<YOUR_BOT_ID>',
                  size: 'large',
                  corner_radius: 10,
                });
              }}
            >
              <TelegramIcon />
            </Button>
          </Stack>
          <Stack sx={styles.footerStack} direction="row" spacing={1}>
            <span style={styles.footerText}>
              don&apos;t have an account?
            </span>
            <Button
              sx={styles.btn}
              onClick={onSignUpClick}
              data-testid="signup-link"
            >
              sign up
            </Button>
          </Stack>
        </Stack>
      </form>
    </div>
  );
};

export default LoginModal;
