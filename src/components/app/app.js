import './app.css';
import React from 'react';
import MainPage from './../pages/main-page/main-page';
import PersonalAccount from '../pages/personal-account/personal-account';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/personal-account" element={<PersonalAccount />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
