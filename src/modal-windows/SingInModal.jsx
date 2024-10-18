import React, { useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import GoogleIcon from '@mui/icons-material/Google';
import ModalClose from '@mui/joy/ModalClose';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import { DialogTitle, IconButton, Input } from '@mui/material';
import Stack from '@mui/joy/Stack';

export default function SingIn() {
  const [open, setOpen] = React.useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

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
            <Stack direction="column" spacing={2}>
              <FormControl>
                <FormLabel>
                  Enter your phone number/email/login
                </FormLabel>
                <Input required />
              </FormControl>
              <FormControl>
                <FormLabel>Enter your password</FormLabel>
                <Input required type="password" />
              </FormControl>
              <div>
                <span>or</span>
                <span>login via:</span>
                <IconButton></IconButton>
                <IconButton>
                  <GoogleIcon />
                </IconButton>
              </div>
              <div>
                <span>don&apos;t have an account?</span>
                <Button
                  onClick={() => {
                    /*redirect to sing up form*/
                  }}
                >
                  sing up
                </Button>
              </div>
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
          <ModalClose />
        </ModalDialog>
      </Modal>
    </>
  );
}
