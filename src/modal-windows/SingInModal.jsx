import React, { useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import GoogleIcon from '@mui/icons-material/Google';
import TelegramIcon from '@mui/icons-material/Telegram';
import ModalClose from '@mui/joy/ModalClose';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import { DialogTitle } from '@mui/material';
import Stack from '@mui/joy/Stack';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';

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
                  label="Enter your phone number/email/login"
                  defaultValue=""
                />
              </FormControl>
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
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
                <span>don&apos;t have an account?</span>
                <Button
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
