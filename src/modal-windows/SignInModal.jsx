import React, { useState } from 'react';
import {
  Modal,
  TextField,
  Button,
  IconButton,
  Stack,
  DialogTitle,
  InputLabel,
  InputAdornment,
  OutlinedInput,
} from '@mui/material';
import ModalDialog from '@mui/joy/ModalDialog';
import GoogleIcon from '@mui/icons-material/Google';
import TelegramIcon from '@mui/icons-material/Telegram';
import ModalClose from '@mui/joy/ModalClose';
import FormControl from '@mui/joy/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import '../modal-windows-styles/SignInModal.css';
import '../modal-windows-styles/ModalWindows.css';

export default function SingIn() {
  const [open, setOpen] = React.useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () =>
    setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="outlined" onClick={handleOpen}>
        sing in
      </Button>
      <Modal open={open} onClose={handleClose}>
        <ModalDialog className="modal-dialog">
          <DialogTitle className="modal-title">sing in</DialogTitle>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setOpen(false);
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <TextField
                  required
                  id="outlined-required"
                  className="text-field"
                  label="Enter your phone number/email/login"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                />
              </FormControl>
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  className="text-field"
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
                      >
                        {showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Enter your password"
                />
              </FormControl>
              <Button type="submit">submit</Button>
              <Stack
                direction="row"
                justifyContent="center"
                spacing={1}
                className="social-btns"
              >
                <span>login via:</span>
                <Button
                  variant="outlined"
                  startDecorator={<GoogleIcon />}
                >
                  Google
                </Button>
                <Button
                  variant="outlined"
                  startDecorator={<TelegramIcon />}
                >
                  Telegram
                </Button>
              </Stack>
              <Stack
                direction="row"
                justifyContent="center"
                spacing={1}
              >
                <span className="footer-text">
                  don&apos;t have an account?
                </span>
                <Button
                  className="footer-link"
                  onClick={() => {
                    /*redirect to sing up form*/
                  }}
                >
                  sing up
                </Button>
              </Stack>
              <Stack
                direction="row"
                justifyContent="center"
                spacing={1}
              >
                <Button
                  className="footer-link"
                  onClick={() => {
                    /*redirect to recover password form*/
                  }}
                >
                  recover password
                </Button>
              </Stack>
            </Stack>
          </form>
          <ModalClose />
        </ModalDialog>
      </Modal>
    </>
  );
}
