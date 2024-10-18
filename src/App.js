import './App.css';
import React, { useState } from 'react';
import SingIn from './modal-windows/SingInModal';

function App() {
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick((prevClick) => !prevClick);
  };
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleClick}>
          {click ? 'Ура' : 'Нажми на меня'}
        </button>
      </header>
      <SingIn />
    </div>
  );
}

export default App;
