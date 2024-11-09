export const styles = {
  root: {
    '--primary-color': '#884f9f',
    '--secondary-color': '#686868',
    '--dark-color': '#191919',
    '--light-color': '#c3c3c3',
  },

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
    color: 'var(--dark-color)',
    '&:hover': {
      color: 'var(--primary-color)',
    },
  },

  inputLabel: {
    color: '#fff',
    marginBottom: '3px',
  },

  loginInputStyle: {
    backgroundColor: 'var(--light-color)',
    borderRadius: '30px',
    input: { color: 'var(--dark-color)' },
    label: { color: 'var(--secondary-color)' },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'var(--secondary-color)',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'var(--primary-color)',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'var(--primary-color)',
    },
  },

  passwordInputStyle: {
    backgroundColor: 'var(--light-color)',
    borderRadius: '30px',
    input: { color: 'var(--dark-color)' },
    label: { color: 'var(--secondary-color)' },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'var(--secondary-color)',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'var(--primary-color)',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'var(--primary-color)',
    },
  },

  btn: {
    color: 'var(--light-color)',
    '&:hover': {
      backgroundColor: 'rgba(136, 79, 159, 0.1)',
      color: '#fff',
    },
  },

  loginvia: {
    color: 'var(--light-color)',
    textAlign: 'center',
    textDecoration: 'underline',
  },

  footerText: {
    color: 'var(--light-color)',
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
    borderColor: 'var(--light-color)',
    color: 'var(--light-color)',
    '&:hover': {
      borderColor: 'var(--primary-color)',
      backgroundColor: 'rgba(136, 79, 159, 0.1)',
      color: '#fff',
    },
  },
};
