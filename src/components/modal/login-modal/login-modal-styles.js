export const styles = {
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '700px',
    width: '550px',
  },

  modalTitle: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: '16px',
    textTransform: 'uppercase',
    fontSize: '2rem',
  },

  stack: {
    display: 'flex',
    justifyContent: 'center',
    margin: '0 50px',
  },

  visability: {
    color: '#191919',
    '&:hover': {
      color: '#884f9f',
    },
  },

  inputLabel: {
    color: '#fff',
    marginBottom: '3px',
  },

  loginInputStyle: {
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
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#884f9f',
    },
  },

  passwordInputStyle: {
    backgroundColor: '#c3c3c3',
    borderRadius: '30px',
    input: { color: '#191919' },
    label: { color: 'var#686868' },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#686868',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#884f9f',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#884f9f',
    },
  },

  btn: {
    color: '#c3c3c3',
    '&:hover': {
      backgroundColor: 'rgba(136, 79, 159, 0.1)',
      color: '#fff',
    },
  },

  loginvia: {
    color: '#c3c3c3',
    textAlign: 'center',
    textDecoration: 'underline',
  },

  footerText: {
    color: '#c3c3c3',
    textAlign: 'center',
    textDecoration: 'underline',
  },

  footerStack: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  socialBtn: {
    minWidth: '40px',
    height: '40px',
    borderRadius: '30px',
    borderColor: '#c3c3c3',
    color: '#c3c3c3',
    '&:hover': {
      borderColor: '#884f9f',
      backgroundColor: 'rgba(136, 79, 159, 0.1)',
      color: '#fff',
    },
  },
};
