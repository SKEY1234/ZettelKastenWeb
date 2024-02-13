import React, { useState } from 'react';
import './App.css';
import { BasePage } from './pages/BasePage';
import { Route, Routes } from 'react-router-dom';

const App: React.FC = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<div>Test</div>} />
        <Route path={`/Zettelkasten`} element={<BasePage />} />
      </Routes>
    </>
  );
}

export default App;
