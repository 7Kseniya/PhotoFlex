import './app.css';
import React from 'react';
import MainPage from './../pages/main-page/main-page';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import PersonalAccount from '../pages/personal-account/personal-account';

function App() {
  return (
    <Router basename="/PhotoFlex">
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            path="/personal-account"
            element={<PersonalAccount />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
