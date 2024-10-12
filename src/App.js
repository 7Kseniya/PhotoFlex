import './App.css';
import React, { useState } from 'react';

function App() {
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick((prevClick) => !prevClick);
  };
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleClick}>
          {click ? 'Ура' : "Нажми на меня"}
        </button>
      </header>
    </div>
  );
}

export default App;
