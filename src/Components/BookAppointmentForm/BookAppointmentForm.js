import React, {useState} from 'react';
import DateTimePicker from "react-datetime-picker"
import './BookAppointmentForm.css'

function BookAppointmentForm({setAppointment, notes, setNotes}) {
  return (
    <div className="book-appointment-cont">
        <div className="row mt-4">
            <div className="col-sm-4">
                <span className="form-label">Last Name</span>
                <br />
                <div className="input-cont">
                    <input
                    type="text"
                    className="form-input last-name-input"
                    name="lastName"
                    //value={patient.last_name}
                    //onChange={setPatient}
                    />
                </div>
            </div>
            <div className="col-sm-4">
                <span className="form-label">First Name</span>
                <br />
                <div className="input-cont"> 
                    <input
                    type="text"
                    className="form-input first-name-input"
                    name="firstName"
                    //value={patient.first_name}
                    //onChange={setPatient}
                    />
                </div>
            </div>
            <div className="col-sm-4">
                <span className="form-label">Middle Name</span>
                <br />
                <div className="input-cont">
                    <input
                    type="text"
                    className="form-input middle-name-input"
                    name="middleName"
                    //value={patient.middle_name}
                    //onChange={setPatient}
                    />
                </div>
            </div>
        </div>

        <div className="row mt-2">
            <div className="col-sm-4">
                <span className="form-label">Street Address</span>
                <br />
                <div className="input-cont">
                  <input
                    type="text"
                    className="form-input streetaddress-input"
                    name="streetAddress"
                    //value={patient.street_address}
                    //onChange={setPatient}
                  />
                </div>
            </div>
            <div className="col-sm-4">
                <span className="form-label">City</span>
                <br />
                <div className="input-cont">
                  <input
                    type="text"
                    className="form-input city-input"
                    name="city"
                    //value={patient.city}
                    //onChange={setPatient}
                  />
                </div>
            </div>
            <div className="col-sm-4">
                <span className="form-label">Appointment Date Time</span>
                <br />
                <DateTimePicker
                    className="form-input appointmentdatetime-input"
                    onChange={setAppointment}
                    //value={appointment}
                />
            </div>
        </div>

        <div className="row mt-2">
            <div className="col-sm-4">
                <span className="form-label">Email Address</span>
                <br />
                <div className="input-cont">
                    <input
                    type="text"
                    className="form-input email-address-input"
                    name="emailAddress"
                    //value={patient.email}
                    //onChange={setPatient}
                    />
                </div>
            </div>
            <div className="col-sm-4">
                <span className="form-label">Mobile Number</span>
                <br />
                <div className="input-cont">
                    <input
                    type="text"
                    className="form-input mobile-number-input"
                    name="mobileNumber"
                    //value={patient.mobile_number}
                    //onChange={setPatient}
                    />
                </div>
            </div>

            <div className="col-sm-4">
                <span className="form-label">Purpose</span>
                <br />
                <select>
                    <option value="check-up">Check-up</option>
                    <option value="follow-up">Follow-up</option>
                    <option value="others">Others</option>
                </select>
            </div>
        </div>

        <div className="row mt-2">
            <div className="notes-cont">
                <span className="form-label"> Notes</span>
                <br />
                <textarea
                id="notes"
                name="notes"
                className="remarks"
                rows="9.8"
                cols="90"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                />
            </div>
        </div>

        <div className="row mt-2">
            <div
            /*className="submit-btn-cont"
            onClick={() => setToNewPatientForm(true)}*/
            >
            <div className="appointment submit-btn">Book Appointment</div>
        </div>
        </div>
    </div>
  )
}

export default BookAppointmentForm