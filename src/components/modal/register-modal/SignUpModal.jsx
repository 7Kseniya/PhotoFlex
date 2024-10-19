import React, { useState } from 'react';
import {
  Modal,
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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function SignUp() {
  const [open, setOpen] = React.useState(false);
  const [contact, setContact] = useState('');
  const [username, setUsername] = useState('');
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
      <Button
        onClick={handleOpen}
        sx={{
          minWidth: '40px',
          height: '40px',
          borderRadius: '30px',
          color: '#884f9f',
          '&:hover': {
            backgroundColor: 'rgba(136, 79, 159, 0.1)',
            borderColor: '#884f9f',
            cursor: 'pointer',
          },
        }}
      >
        <AccountCircleIcon />
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        className="modal-window"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ModalDialog
          className="modal-dialog"
          sx={{
            backgroundColor: '#191919',
            borderRadius: '20px',
            padding: '24px',
            color: '#fff',
            fontFamily: "'B612 Mono', sans-serif",
            maxWidth: '500px',
            width: '550px',
            height: '700px',
            borderColor: '#000',
          }}
        >
          <DialogTitle
            className="modal-title"
            sx={{
              textAlign: 'center',
              fontSize: '1.5rem',
              color: '#fff',
              marginBottom: '16px',
            }}
          >
            SIGN UP
          </DialogTitle>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setOpen(false);
            }}
          >
            <Stack spacing={2}>
              <FormControl variant="outlined">
                <InputLabel
                  htmlFor="outlined-adornment-password"
                  sx={{ color: '#fff', marginBottom: '3px' }}
                >
                  Enter your phone number/email/login
                </InputLabel>
                <OutlinedInput
                  required
                  id="outlined-adornment-password"
                  className="text-field"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  label="Contact"
                  sx={{
                    backgroundColor: '#c3c3c3',
                    borderRadius: '30px',
                    input: { color: '#191919' },
                    label: { color: '#686868' },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#686868',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#884f9f',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline':
                      {
                        borderColor: '#884f9f',
                      },
                  }}
                />
              </FormControl>
              <FormControl variant="outlined">
                <InputLabel
                  htmlFor="outlined-adornment-password"
                  sx={{ color: '#fff', marginBottom: '3px' }}
                >
                  Come up with a password
                </InputLabel>
                <OutlinedInput
                  required
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
                        sx={{
                          color: '#191919',
                          '&:hover': {
                            color: '#884f9f',
                          },
                        }}
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
                  sx={{
                    backgroundColor: '#c3c3c3',
                    borderRadius: '30px',
                    input: { color: '#191919' },
                    label: { color: '#686868' },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#686868',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#884f9f',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline':
                      {
                        borderColor: '#884f9f',
                      },
                  }}
                />
              </FormControl>
              <FormControl variant="outlined">
                <InputLabel
                  htmlFor="outlined-adornment-password"
                  sx={{ color: '#fff', marginBottom: '3px' }}
                >
                  Come up with username
                </InputLabel>
                <OutlinedInput
                  required
                  id="outlined-adornment-password"
                  className="text-field"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  label="Username"
                  sx={{
                    backgroundColor: '#c3c3c3',
                    borderRadius: '30px',
                    input: { color: '#191919' },
                    label: { color: '#686868' },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#686868',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#884f9f',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline':
                      {
                        borderColor: '#884f9f',
                      },
                  }}
                />
              </FormControl>

              <Button
                type="submit"
                sx={{
                  color: '#c3c3c3',
                  marginBottom: '5px',
                  '&:hover': {
                    backgroundColor: 'rgba(136, 79, 159, 0.1)',
                    color: '#fff',
                  },
                }}
              >
                submit
              </Button>
              <span
                style={{
                  color: '#c3c3c3',
                  textAlign: 'center',
                  textDecoration: 'underline',
                }}
              >
                login via:
              </span>
              <Stack
                direction="row"
                justifyContent="center"
                spacing={1}
                className="social-btns"
                textAlign="center"
                alignItems="center"
                marginBottom="5px"
              >
                <Button
                  variant="outlined"
                  sx={{
                    minWidth: '40px',
                    height: '40px',
                    borderRadius: '30px',
                    borderColor: '#c3c3c3',
                    color: '#c3c3c3',
                    '&:hover': {
                      backgroundColor: 'rgba(136, 79, 159, 0.1)',
                      borderColor: '#884f9f',
                      color: '#fff',
                    },
                  }}
                >
                  <GoogleIcon />
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    minWidth: '40px',
                    height: '40px',
                    borderRadius: '30px',
                    borderColor: '#c3c3c3',
                    color: '#c3c3c3',
                    '&:hover': {
                      backgroundColor: 'rgba(136, 79, 159, 0.1)',
                      borderColor: '#884f9f',
                      color: '#fff',
                    },
                  }}
                >
                  <TelegramIcon />
                </Button>
              </Stack>
              <Stack
                direction="row"
                justifyContent="center"
                spacing={1}
                textAlign="center"
                alignItems="center"
              >
                <span
                  className="footer-text"
                  style={{
                    color: '#c3c3c3',
                    textAlign: 'center',
                    textDecoration: 'underline',
                  }}
                >
                  already have an account?
                </span>
                <Button
                  className="footer-link"
                  onClick={() => {
                    /*redirect to sign in form*/
                  }}
                  sx={{
                    color: '#c3c3c3',
                    '&:hover': {
                      backgroundColor: 'rgba(136, 79, 159, 0.1)',
                      color: '#fff',
                    },
                  }}
                >
                  sign in
                </Button>
              </Stack>
              <Stack
                direction="row"
                justifyContent="center"
                spacing={1}
                textAlign="center"
                alignItems="center"
              >
                <Button
                  className="footer-link"
                  onClick={() => {
                    /*redirect to recover password form*/
                  }}
                  sx={{
                    color: '#c3c3c3',
                    '&:hover': {
                      backgroundColor: 'rgba(136, 79, 159, 0.1)',
                      color: '#fff',
                    },
                  }}
                >
                  recover password
                </Button>
              </Stack>
            </Stack>
          </form>
          <ModalClose
            onClick={handleClose}
            sx={{ color: '#884f9f' }}
          />
        </ModalDialog>
      </Modal>
    </>
  );
}
