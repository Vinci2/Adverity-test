import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import MainBody from './domain/MainBody/MainBody';
import MainHeader from './domain/MainHeader/MainHeader';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MainHeader></MainHeader>
        <MainBody></MainBody>
      </BrowserRouter>
    </div>
  );
}

export default App;
