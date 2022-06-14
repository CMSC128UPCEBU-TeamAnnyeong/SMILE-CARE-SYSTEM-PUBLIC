import React, { useState } from "react"
import DateTimePicker from "react-datetime-picker"
import { MultiSelect } from "react-multi-select-component"
import { createPatient } from "../../../Helpers/apiCalls/patientApi"
import {
  getCategories,
  getServices
} from "../../../Helpers/apiCalls/categoryServicesApi"
import { createAppointment } from "../../../Helpers/apiCalls/appointmentApi"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Navigate } from "react-router-dom"
import ProfileUpload from "./ProfileUpload/ProfileUpload"
import { Modal, Button } from "bootstrap"

//css
import "./newPatient.css"

function NewPatientForm4({
  patient,
  setPatient,
  medicalHistory,
  setMedicalHistory,
  services,
  setServices,
  category,
  setCategory,
  appointment,
  setAppointment,
  agreement,
  sickness,
  notes,
  setNotes,
  navigation
}) {
  const [inactive, setInactive] = useState(false)
  const [value, onChange] = useState(new Date())
  const [categories, setCategories] = useState([])
  const [serviceOptions, setServiceOptions] = useState([])
  const [redirect, setRedirect] = useState(false)
  const [showToken, setShowToken] = useState(false)
  const [purpose, setPurpose] = useState("")
  const [profilePicture, setProfilePicture] = useState("")
  const [token, setToken] = useState({
    appointment_token: "",
    patient_short_id: ""
  })

  const options = [{ label: "Root Canal", value: "" }]

  const { appointmentDateTime, remarks } = appointment

  async function submit() {
    const response = await createPatient(
      patient,
      medicalHistory,
      sickness,
      agreement,
      profilePicture
    )
    console.log(response)
    if (response) {
      toast.success("Successfully Added Patient!")
      setTimeout(function () {
        setRedirect(true)
      }, 2000)
      const id = response.data.data.id
      console.log(id)
      submitAppointment(id)
    } else if (response.error) {
      toast.error(response.error)
      console.log(response.error)
    }
  }

  async function submitAppointment(id) {
    console.log(appointment)
    console.log(category)
    console.log(services)
    const response = await createAppointment(
      id,
      category,
      appointment,
      services,
      notes,
      "PENDING",
      purpose
    )
    console.log(response)
    if (response) {
      toast.success("Successfully Added Appointment!") // This never shows up idk why
      // setTimeout(function () {
      //   setRedirect(true)
      // }, 2000)
    }
  }

  const handleShowToken = () => {
    setToken({
      appointment_token: "",
      patient_short_id: ""
    })
    setShowToken(true)
  }

  const renderToken = () => {
    if (!token.appointment_token || !token.patient_short_id) return null

    return (
      <Modal show={true} onHide={handleShowToken} on size="m">
        {/* <Modal.Header closeButton>
          <Modal.Title>{`Appointment Token & Patient ID`}</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <div style={{ textAlign: "center" }}>
            <div className="appointment-token mb-5">
              <Modal.Title>Appointment Token</Modal.Title>
              <div
                style={{ fontSize: 22, fontWeight: "bold", letterSpacing: 4 }}
              >
                {token.appointment_token}
              </div>
            </div>
            <div className="patient-id">
              <Modal.Title>Patient ID</Modal.Title>
              <div
                style={{ fontSize: 22, fontWeight: "bold", letterSpacing: 4 }}
              >
                {token.patient_short_id}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShowToken}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
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
      console.log(response)
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
  }, [category])

  console.log(redirect)
  if (redirect === true) {
    return <Navigate to={"/appointment"} />
  }

  if (showToken === true) {
    return <Navigate to={"/appointment"} />
  }

  const renderBody = () => {
    return (
      <div className="add-appointment-section-body">
        <div className="profile-picture">
          <div className="form-label">Profile Picture</div>
          <ProfileUpload
            setProfilePicture={setProfilePicture}
            profilePicture={profilePicture}
          />
        </div>
        <div className="inputs">
          <div className="top-section-inputs">
            <div className="input">
              <div className="title">Appointment Date Time</div>
              <DateTimePicker
                className="datetime-picker"
                onChange={onChange}
                value={value}
              />
            </div>
            <div className="input">
              <div className="title">Purpose</div>
              <select name="services" className="purposes">
                <option value="" disabled>
                  Select{" "}
                </option>
                <option value="check-up">Check-up</option>
                <option value="follow-up">Follow-up</option>
                <option value="others">Others</option>
                {serviceOptions.map((data, index) => {
                  return <option value={data.label}>{data.label}</option>
                })}
              </select>
            </div>
          </div>
          <div className="bottom-section-inputs">
            <div className="input">
              <div className="title">Remarks / Notes</div>
              <textarea
                id="notes"
                name="notes"
                rows="9"
                cols="50"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderButtons = () => {
    if (!appointmentDateTime) {
      return
    }

    return (
      <div className="add-appointment-buttons">
        <button className="button back" onClick={() => navigation.previous()}>
          BACK
        </button>
        <button className="button next" onClick={() => submit()}>
          SAVE
        </button>
      </div>
    )
  }

  return (
    <div className="page">
      {renderToken()}
      <ToastContainer />
      <div className={`container ${inactive ? "inactive" : "active"}`}>
        <div className="row page-content">
          <div className="form-card-cont-form4">
            <div className="personal-info-header-appointment">
              Add Appointment
            </div>

            {renderBody()}
            {renderButtons()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewPatientForm4
