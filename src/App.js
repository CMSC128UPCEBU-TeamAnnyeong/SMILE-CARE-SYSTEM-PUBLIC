import React, { useState } from "react"
import "./App.css"
// import "./components/FontAwesomeIcons"
import Navbar from "./components/Navbar/Navbar"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom"
import { getUser } from "./Helpers/Utils/Common"

/** PAGES **/
import Home from "./Pages/Home"
import About from "./Pages/About"
import ViewQueue from "./Pages/ViewQueue"
import ViewQueueTable from "./Pages/ViewQueueTable"
import BookAppointment from "./Pages/BookAppointment"
import BookAppointmentForm from "./components/BookAppointmentForm/BookAppointmentForm"
import Contact from "./Pages/Contact"
import NewPatientSwitchForm from "./Pages/Appointments/New Patient/NewPatientSwitchForm"
import ReturningPatientSwitchForm from "./Pages/Appointments/Returning Patient/ReturningPatientSwitchForm"

function App() {
  document.title = "SMILE CARE SYSTEM"
  const [isAuthenticated, setAuthentication] = useState(getUser())

  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/book-appointment-form"
            element={<BookAppointmentForm />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/view" element={<ViewQueue />} />
          <Route path="/view/queue" element={<ViewQueueTable />} />
          <Route path="/appointment" element={<BookAppointment />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/new-patient-appointment"
            element={
             <NewPatientSwitchForm /> 
            }
          />
          <Route
            path="/returning-patient-appointment"
            element={
                <ReturningPatientSwitchForm />
            }
          />
        </Routes>
      </Router>
    </div>
  )
}

export default App
