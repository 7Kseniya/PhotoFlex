import './App.css';
import React, { useState } from 'react';

function App() {
  const [click, setClick] = useState(false);
  const [anotherClick, setAnotherClick] = useState(false);

  const handleClick = () => {
    setClick((prevClick) => !prevClick);
  };

  const handleAnotherClick = () => {
    setAnotherClick((prevClick) => !prevClick);
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleClick}>
          {click ? 'Ура' : 'Нажми на меня'}
        </button>
        <button onClick={handleAnotherClick}>
          {' '}
          {anotherClick ? 'Еще' : 'Нажми еще раз'}
          Нажми еще раз
        </button>{' '}
      </header>
    </div>
  );
}

export default App;
