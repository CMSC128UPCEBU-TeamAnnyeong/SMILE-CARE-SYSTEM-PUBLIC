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

//css
import "./newPatient.css"

//components
import Navbar from "../../../components/Navbar/Navbar"

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
  const [purpose, setPurpose] = useState("")

  const options = [{ label: "Root Canal", value: "" }]

  const { appointmentDateTime, remarks } = appointment

  async function submit() {
    const response = await createPatient(
      patient,
      medicalHistory,
      sickness,
      agreement
    )
    if (response) {
      console.log(response)
      toast.success("Successfully Added Patient!")
      const id = response.data.data.id
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
      toast.success("Successfully Added Appointment!")
      setTimeout(function () {
        setRedirect(true)
      }, 2000)
    }
  }

  function proceed() {
    if (appointmentDateTime != "" /*&& services.length != 0*/) {
      return (
        <button className="form-button-next" onClick={() => submit()}>
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

  if (redirect == true) {
    return <Navigate to={"/appointments"} />
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
            <h1 className="page-title">Add Appointment</h1>
          </div>
        </div>
        <div className="row page-content">
          <div className="form-card-cont">
            <div className="row mt-4">
              <div className="col-sm-4">
                <span className="form-label">Appointment Date Time</span>
                <br />
                <DateTimePicker
                  className="form-input"
                  onChange={onChange}
                  value={value}
                />
              </div>
               <div className="col-sm-4">
                <span className="form-label">Purpose</span>
                <br />
                <select
                  className="form-input category-input"
                  name="purpose"
                  onChange={(e) => setPurpose(e.target.value)}
                >
                  <option value="" disabled> Select </option>
                  <option value="check-up">Check-up</option>
                  <option value="follow-up">Follow-up</option>
                  <option value="others">Others</option>
                  {serviceOptions.map((data, index) => {
                    return <option value={data.label}>{data.label}</option>
                  })}
                </select>
              </div>
            </div>
            <div class="row mt-5">
              <span className="form-label">Remarks / Notes</span>
              <br />
              <textarea
                id="notes"
                name="notes"
                className="notesNewPatient"
                rows="4"
                cols="117"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
            <div className="row">
              <div className="col d-flex justify-content-end">
                <button
                  className="form-button-previous"
                  onClick={() => navigation.previous()}
                >
                  BACK
                </button>
                {proceed()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewPatientForm4
