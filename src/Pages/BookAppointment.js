import React, { useState } from "react"
import "./BookAppointment.css"
import book from "../Assets/book.png"
import rightArrow from "../Assets/right-arrow.png"
import { Navigate } from "react-router-dom"
import logoSmileCareSystem from "../../src/Assets/logo.png"

function BookAppointment() {
  const [toBookAppointmentForm, setBookAppointmentForm] = useState(false)
  const [toNewPatient, setToNewPatient] = useState(false);

  if (toBookAppointmentForm == true) {
    return <Navigate to={"/returning-patient-appointment"} />
  }

  if(toNewPatient === true) {
    return <Navigate to={"/new-patient-appointment"}/>
  }

  function PoweredBy() {
    return (
      <div className="footer">
        <div className="poweredby-text-appointment">POWERED BY</div>
        <img src={logoSmileCareSystem} className="poweredby-logo" />
      </div>
    )
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-5">
          <div className="row">
            <h1 className="book-header">Book Appointment</h1>
            <h2 className="book-subheader">
              Book an appointment with us now so you can smile more confidently
            </h2>
          </div>

          <div className="row">
            <p className="book-subsubheader">
              Are you a returning patient or new patient?
            </p>
            <div
              className="submit-btn-cont"
              onClick={() => setBookAppointmentForm(true)}
            >
              <div className="view-queue submit-btn">Returning Patient</div>
              <div className="view-queue submit-btn btn-part">
                <img src={rightArrow} className="arrow-icon" />
              </div>
            </div>
            <div
              className="submit-btn-cont"
              onClick={() => setToNewPatient(true)}
            >
              <div className="view-queue submit-btn">New Patient</div>
              <div className="view-queue submit-btn btn-part">
                <img src={rightArrow} className="arrow-icon" />
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6">
          <img src={book} className="book-appointment-pic" />
        </div>
      </div>
      <PoweredBy/>
    </div>
  )
}

export default BookAppointment
