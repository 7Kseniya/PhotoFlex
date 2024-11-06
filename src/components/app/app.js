import './app.css';
import React from 'react';
import MainPage from './../pages/main-page/main-page';

function App() {
  const throwError = () => {
    throw new Error('Test error!');
  };
  return (
    <div className="App">
      <MainPage />
      <button onClick={throwError}>Сгенерировать ошибку</button>
    </div>
  );
}

export default App;
