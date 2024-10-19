import './App.css';
import React, { useState } from 'react';
import SingIn from './modal-windows/SignInModal';
import SingUp from './modal-windows/SignUpModal';

function App() {
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick((prevClick) => !prevClick);
  };
  return (
    <div className="App">
      {/* <header className="App-header">
        <button onClick={handleClick}>
          {click ? 'Ура' : 'Нажми на меня'}
        </button>
      </header> */}
      <SingIn />
      <SingUp />
    </div>
  );
}

export default App;
