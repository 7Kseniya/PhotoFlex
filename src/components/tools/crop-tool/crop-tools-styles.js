const styles = {
  cropItemStyle: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    flexDirection: 'row',
  },
  label: {
    color: 'white',
    fontSize: '25px',
    textAlign: 'center',
    marginLeft: '10px',
  },
  sharedContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginTop: '20px',
    alignItems: 'center',
    height: '980px',
    overflowY: 'scroll',
  },
  cropIconStyle: {
    fontSize: '80px',
    color: 'white',
    cursor: 'pointer',
  },
  dimensionInputContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '10px',
  },
  dimensionInput: {
    padding: '5px',
    fontSize: '30px',
    border: '2px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#1e1e1e',
    color: 'white',
    outline: 'none',
    width: '100px',
    transition: '0.2s',
    marginTop: '10px',
  },
};

export default styles;
