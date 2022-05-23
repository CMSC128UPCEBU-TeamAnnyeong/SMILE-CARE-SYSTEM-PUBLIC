import React, { useState } from 'react'
import './BookAppointment.css';
import book from '../Assets/book.png'
import rightArrow from '../Assets/right-arrow.png';
import { Navigate } from "react-router-dom"

function BookAppointment() {
    const [toNewPatientForm, setToNewPatientForm] = useState(false)

    if (toNewPatientForm == true) {
        return 
      }

    return (
        <div className="container">
            <div className='row'>
                <div className='col-sm-5'>
                    <div className='row'>
                        <h1 className='book-header'>Book Appointment</h1>
                        <h2 className='book-subheader'>We help you bring out your greatest smile</h2>
                    </div>

                    <div className='row'>
                        <div className='submit-btn-cont' onClick={() => <Navigate to={"/new-patient-appointment"} />}>
                            <div className='view-queue submit-btn'>New Patient</div>
                            <div className='view-queue submit-btn btn-part'>
                                <img src={rightArrow} className="arrow-icon"/>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='submit-btn-cont' onClick={() => setToNewPatientForm(true)}>
                            <div className='view-queue submit-btn'>Returning Patient</div>
                            <div className='view-queue submit-btn btn-part'>
                                <img src={rightArrow} className="arrow-icon"/>
                            </div>
                        </div>
                    </div>

                </div>

                <div className='col-sm-6'>
                    <img src={book} className="book-appointment-pic"/>
                </div>
            </div>
        </div>
    )
}

export default BookAppointment