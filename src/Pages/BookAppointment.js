import React, { useState } from "react"
import "./BookAppointment.css"
import book from "../Assets/book.png"
import rightArrow from "../Assets/right-arrow.png"
import { Navigate } from "react-router-dom"

function BookAppointment() {
  const [toBookAppointmentForm, setBookAppointmentForm] = useState(false)

  if (toBookAppointmentForm == true) {
    return <Navigate to={"/book-appointment-form"} />
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
            <div
              className="submit-btn-cont"
              onClick={() => setBookAppointmentForm(true)}
            >
              <div className="view-queue submit-btn">Create Appointment</div>
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
    </div>
  )
}

export default BookAppointment
