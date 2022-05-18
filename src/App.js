import React, { useState } from 'react';
import './App.css'
import './Components/FontAwesomeIcons';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

/** PAGES **/
import ViewQueue from './Pages/ViewQueue';
import ViewQueueTable from './Pages/ViewQueueTable';

function App() {

  document.title = 'SMILE CARE SYSTEM';

  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<ViewQueue/>}/>
          <Route path="/view" element={<ViewQueueTable/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
