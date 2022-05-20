import React, { useState } from 'react';
import './App.css'
import './Components/FontAwesomeIcons';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { getUser } from './Helpers/Utils/Common';

/** PAGES **/
import ViewQueue from './Pages/ViewQueue';
import ViewQueueTable from './Pages/ViewQueueTable';
import BookAppointment from './Pages/BookAppointment';
import NewPatientSwitchForm from './Components/New Patient/NewPatientSwitchForm'

function App() {

  document.title = 'SMILE CARE SYSTEM';
  const [isAuthenticated, setAuthentication] = useState(getUser());

  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/new-patient-appointment" element={isAuthenticated ? <NewPatientSwitchForm/> : <Navigate to="/"/>}/>
          <Route path="/" element={<ViewQueue/>}/>
          <Route path="/view" element={<ViewQueueTable/>}/>
          <Route path="/appointment" element={<BookAppointment/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
