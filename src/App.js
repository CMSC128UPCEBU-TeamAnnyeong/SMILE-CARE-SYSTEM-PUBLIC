import React, { useState } from 'react';
import './App.css'
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

/** PAGES **/
import ViewQueue from './Pages/ViewQueue';

function App() {

  document.title = 'SMILE CARE SYSTEM';

  return (
    <div className="App">
      <Navbar />
      <ViewQueue/>
    </div>
  );
}

export default App;
