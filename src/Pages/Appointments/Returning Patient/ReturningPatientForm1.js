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
import {
  getPatient,
  getPatientByShortId
} from "../../../Helpers/apiCalls/patientApi"
import { useParams } from "react-router-dom"
import { Button, Modal } from "react-bootstrap"

//css
import "./returningPatient.css"

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
  const [purpose, setPurpose] = useState("check-up")
  const [patientId, setPatientId] = useState("")
  const [isFound, setIsFound] = useState(false)
  const [token, setToken] = useState();
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

  //MODAL
  const [show, setShow] = useState(false)
  const handleClose = () => {
      setRedirect(true)
  }
  const handleShow = () => setShow(true)

  async function submitAppointment() {
    const response = await createAppointment(
      patient.id,
      category,
      appointment,
      services,
      notes,
      "PENDING",
      purpose
    )
    console.log(response)
    if (response) {
      toast.success("Successfully Added Appointment!")
      handleShow();
      setToken(response.data.data.data)
    }
  }

  async function fetchPatient(id) {
    const response = await getPatientByShortId(id)
    console.log(response)
    if (response.data.status === 200) {
      setIsFound(true)
      setPatient(response.data.data.data)
    }
  }

  function proceed() {
    if (appointmentDateTime != "" && purpose != "") {
      return (
        <button
          className="form-button-next"
          onClick={() => submitAppointment()}
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
            onClick={() => submitAppointment()}
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
        <div className="row"></div>
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
                <button
                  className="form-button-search"
                  onClick={() => fetchPatient(patientId)}
                >
                  Search
                </button>
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
                      onChange={setAppointment}
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
                      <option value="" disabled> Select </option>
                      <option value="check-up" selected>Check-up</option>
                      <option value="follow-up">Follow-up</option>
                      <option value="others">Others</option>
                      {serviceOptions.map((data, index) => {
                        return <option value={data.label}>{data.label}</option>
                      })}
                    </select>
                    {purpose == "" && (
                        <span className="error-msg">Purpose is required*</span>
                      )}
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
                        rows="6"
                        cols="90"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
            {isFound === true && proceed()}
            <Modal
          show={show}
          onHide={() => {handleClose();}}
          size="xl"
        >
        <Modal.Header closeButton>
            <Modal.Title> Add Appointment </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div style={{ textAlign: "center", paddingBottom: 15 }}>
            <div className="appointment-token mb-5">
              <Modal.Title>Appointment Token</Modal.Title>
              <div
                style={{ fontSize: 22, fontWeight: "bold", letterSpacing: 4 }}
              >
                {token ? token.token : ""}
              </div>
            </div>
            <div className="patient-id">
              <Modal.Title>Patient ID</Modal.Title>
              <div
                style={{ fontSize: 22, fontWeight: "bold", letterSpacing: 4, marginBottom: 112 }}
              >
                {token ? token.patient.short_id : ""}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {handleClose()}}>
            Close
          </Button>
        </Modal.Footer>
        </Modal>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReturningPatientForm1
