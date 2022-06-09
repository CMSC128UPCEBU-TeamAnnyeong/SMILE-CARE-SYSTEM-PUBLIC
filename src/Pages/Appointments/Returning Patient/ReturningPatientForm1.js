import React, { useState } from "react"
import DateTimePicker from "react-datetime-picker"
import { Navigate } from "react-router"
import { MultiSelect } from "react-multi-select-component"
import {
  getCategories,
  getServices
} from "../../../Helpers/apiCalls/categoryServicesApi"
import { createAppointment } from "../../../Helpers/apiCalls/appointmentApi"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { getPatient } from "../../../Helpers/apiCalls/patientApi"
import { useParams } from "react-router-dom"

//css
import "./returningPatient.css"

//components
import Navbar from "../../../components/Navbar/Navbar"

function ReturningPatientForm1({
  appointment,
  setAppointment,
  notes,
  setNotes,
  services,
  setServices,
  category,
  setCategory
}) {
  const [inactive, setInactive] = useState(false)
  const [selected, setSelected] = useState("")
  const [value, onChange] = useState(new Date())
  const [navigate, setNavigate] = useState(false)
  const [categories, setCategories] = useState([])
  const [serviceOptions, setServiceOptions] = useState([])
  const [redirect, setRedirect] = useState(false)
  const [patient, setPatient] = useState({})
  const [purpose, setPurpose] = useState("");
  const [patientId, setPatientId] = useState("");
  const [isFound, setIsFound] = useState(false);
  const { id } = useParams()

  const options = [{ label: "Root Canal", value: "" }]

  const {
    lastName,
    firstName,
    middleName,
    city,
    streetAddress,
    mobileNumber,
    emailAddress
  } = patient
  const { appointmentDateTime, remarks } = appointment

  async function submitAppointment(id) {
    const response = await createAppointment(
      id,
      category,
      appointment,
      services,
      notes,
      "APPROVED",
      purpose
    )
    console.log(response)
    if (response) {
      toast.success("Successfully Added Appointment!")
      setTimeout(function () {
        setRedirect(true)
      }, 2000)
    }
  }

  async function fetchPatient(id) {
    const response = await getPatient(id)
    console.log(response)
    if(response.data.status === 200) {
      setIsFound(true);
      setPatient(response.data.data.data)
    }
  }

  function proceed() {
    if (appointmentDateTime != "" /*&& services.length != 0*/) {
      return (
        <button
          className="form-button-next"
          onClick={() => submitAppointment(id)}
        >
          SAVE
        </button>
      )
    }
  }

  async function fetchCategories() {
    categories.length = 0
    const response = await getCategories()
    response.data.data.data.map((data) => {
      var info = {}
      info.label = data.name
      info.value = data.id
      setCategories((oldArray) => [...oldArray, info])
    })
  }

  async function fetchServices() {
    serviceOptions.length = 0
    if (category.length !== 0) {
      const response = await getServices(category)
      response.data.data.data.map((data) => {
        var info = {}
        info.label = data.name
        info.value = data.id
        setServiceOptions((oldArray) => [...oldArray, info])
      })
    }
  }

  React.useEffect(() => {
    fetchCategories()
    fetchServices()
  }, [])

  function proceed() {
    return (
      <div className="row">
        <div className="col d-flex justify-content-end">
          <button
            className="form-button-cancel"
            onClick={() => setRedirect(true)}
          >
            CANCEL
          </button>
          <button
            className="form-button-save"
            onClick={() => submitAppointment(id)}
          >
            SAVE
          </button>
        </div>
      </div>
    )

    // }
  }

  if (redirect == true) {
    return <Navigate to="/appointment" />
  }

  return (
    <div className="page">
      <ToastContainer />
      <div className={`container ${inactive ? "inactive" : "active"}`}>
        <div className="row">
        </div>
        <div className="row page-content">
          <div className="form-card-cont">
          <div className="row mt-4">
              <div className="col-sm-4">
                <span className="form-label">Patient ID</span>
                <br />
                <div className="input-cont">
                  <input
                    type="text"
                    data-testid="last-name-input"
                    className="form-input last-name-input"
                    name="id"
                    onChange={(e) => setPatientId(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                  <button className="form-button-search" onClick={() => fetchPatient(patientId)}>Search</button>
                </div>
            </div>
            {isFound === true && (
                <>
                <div className="row mt-4">
                <div className="col-sm-4">
                  <span className="form-label">Last Name</span>
                  <br />
                  <div className="input-cont">
                    <input
                      type="text"
                      data-testid="last-name-input"
                      className="form-input last-name-input"
                      name="lastName"
                      value={patient.last_name}
                      onChange={setPatient}
                      readOnly
                      disabled
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
                      value={patient.first_name}
                      onChange={setPatient}
                      readOnly
                      disabled
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
                      value={patient.middle_name}
                      onChange={setPatient}
                      readOnly
                      disabled
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
                        value={patient.street_address}
                        onChange={setPatient}
                        readOnly
                        disabled
                      />
                    </div>
                </div>
                <div className="col-sm-4">
                  <span className="form-label">Appointment Date Time</span>
                  <br />
                  <DateTimePicker
                    className="form-input appointmentdatetime-input"
                    onChange= {setAppointment}
                    value={appointment}
                  />
                </div>
                <div className="col-sm-4">
                  <span className="form-label">Purpose</span>
                  <br />
                  <select
                    className="form-input category-input"
                    name="services"
                    onChange={(e) => setPurpose(e.target.value)}
                  >
                    <option value=""> Select </option>
                    <option value="check-up">Check-up</option>
                    <option value="follow-up">Follow-up</option>
                    <option value="others">Others</option>
                    {serviceOptions.map((data, index) => {
                      return <option value={data.label}>{data.label}</option>
                    })}
                  </select>
                </div>
              </div>
              <div className="row mt-2 personal-input-cont">
                <div className="col-sm-4">
                  <span className="form-label">City</span>
                  <br />
                  <div className="input-cont">
                    <input
                      type="text"
                      className="form-input city-input"
                      name="city"
                      value={patient.city}
                      onChange={setPatient}
                      readOnly
                      disabled
                    />
                  </div>
                  <span className="form-label">Email Address</span>
                  <br />
                  <div className="input-cont">
                    <input
                      type="text"
                      className="form-input email-address-input"
                      name="emailAddress"
                      value={patient.email}
                      onChange={setPatient}
                      readOnly
                      disabled
                    />
                  </div>
                  <span className="form-label">Mobile Number</span>
                  <br />
                  <div className="input-cont">
                    <input
                      type="text"
                      className="form-input mobile-number-input"
                      name="mobileNumber"
                      value={patient.mobile_number}
                      onChange={setPatient}
                      readOnly
                      disabled
                    />
                  </div>
                </div>
                <div class="col-sm-4">
                  <div className="notes-cont">
                    <span className="form-label"> Notes</span>
                    <br />
                    <textarea
                      id="notes"
                      name="remarks"
                      className="remarks"
                      rows="9"
                      cols="90"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              </>
            )}
            {isFound === true && (
                proceed()
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReturningPatientForm1
