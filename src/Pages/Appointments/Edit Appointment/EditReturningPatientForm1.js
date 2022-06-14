import React, { useState } from "react"
import DateTimePicker from "react-datetime-picker"
import { Navigate } from "react-router"
import { MultiSelect } from "react-multi-select-component"
import {
  getCategories,
  getServices
} from "../../../Helpers/apiCalls/categoryServicesApi"
import { updateAppointment } from "../../../Helpers/apiCalls/appointmentApi"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { getPatient } from "../../../Helpers/apiCalls/patientApi"
import { getAppointment } from "../../../Helpers/apiCalls/appointmentApi"
import { useParams } from "react-router-dom"

import "./EditReturningPatientAppointments.css"

//components
import Navbar from "../../../components/Navbar/Navbar"

function EditReturningPatientForm1({
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
  const [editAppointment, setEditAppointment] = useState({})
  const [done, setDone] = useState(false)
  const { id, patientId } = useParams()

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

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditAppointment((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  async function edit(id) {
    const editResponse = await updateAppointment(id, editAppointment)
    if (editResponse) {
      toast.success("Successfully Updated Appointment!")
      setTimeout(function () {
        setRedirect(true)
      }, 2000)
    }
  }

  async function fetchAppointment(id) {
    const response = await getAppointment(id)
    console.log(response)

    var info = {}
    var date = new Date(response.data.data.data.appointment_date_time)
    info.appointment_date_time = date
    info.category = response.data.data.data.category.id
    info.services = response.data.data.data.services[0]
    info.remarks = response.data.data.data.remarks
    setEditAppointment(info)
    setDone(true)
  }

  async function fetchPatient(patientId) {
    const response = await getPatient(patientId)
    console.log(response)
    console.log("here")
    setPatient(response.data.data.data)
  }

  function proceed() {
    if (appointmentDateTime != "" && services.length != 0) {
      return (
        <button className="form-button-next" onClick={() => edit(id)}>
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
    setServiceOptions([])
    const response = await getServices([editAppointment.category])
    response.data.data.data.map((data) => {
      var info = {}
      info.label = data.name
      info.value = data.id
      setServiceOptions((oldArray) => [...oldArray, info])
    })
  }

  React.useEffect(() => {
    fetchPatient(patientId)
    fetchAppointment(id)
  }, [])

  React.useEffect(() => {
    if (done === true) {
      setServiceOptions([])
      fetchCategories()
      fetchServices()
    }
  }, [editAppointment, done])

  function proceed() {
    // if(firstName != "" &&
    //     lastName != "" &&
    //     middleName != "" &&
    //     birthDate != "" &&
    //     sex != "" &&
    //     religion != "" &&
    //     city != "" &&
    //     nationality != "" &&
    //     streetAddress != "" &&
    //     occupation != "" &&
    //     mobileNumber != ""
    //    ) {

    return (
      <div className="row">
        <div className="col d-flex justify-content-end">
          <button
            className="form-button-cancel"
            onClick={() => setRedirect(true)}
          >
            CANCEL
          </button>
          <button className="form-button-save" onClick={() => edit(id)}>
            SAVE
          </button>
        </div>
      </div>
    )

    // }
  }

  if (redirect == true) {
    return <Navigate to="/appointments" />
  }

  return (
    <div className="page">
      <Navbar
        onCollapse={(inactive) => {
          setInactive(inactive)
        }}
        active={1} //Appointment navbar index
      />
      <ToastContainer />
      <div className={`container ${inactive ? "inactive" : "active"}`}>
        <div className="row">
          <div className="col-sm-6">
            <h1 className="page-title">Edit Appointment</h1>
          </div>
        </div>
        <div className="row page-content">
          <div className="form-card-cont">
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
                  onChange={(e) => handleChange(e)}
                  value={editAppointment.appointment_date_time}
                  name="appointment_date_time"
                />
              </div>
              <div className="col-sm-4">
                <span className="form-label">Purpose</span>
                <br />
                <select
                  className="form-input category-input"
                  name="services"
                  defaultValue={editAppointment.services}
                  value={editAppointment.services}
                  onChange={(e) => handleChange(e)}
                >
                  <option value="" disabled>
                    {" "}
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
                    value={editAppointment.remarks}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
            </div>

            {proceed()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditReturningPatientForm1
