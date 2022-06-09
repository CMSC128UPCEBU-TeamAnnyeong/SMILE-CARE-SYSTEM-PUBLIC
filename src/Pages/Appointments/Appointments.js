import React, { useState } from "react"
import { Navigate } from "react-router-dom"
import { getTime, getTodayDateISO, refreshPage } from "../../Helpers/Utils/Common"
import {
  approveAppointment,
  disapproveAppointment,
  getAppointments,
  getPendingAppointments,
  updateStatusAppointment
} from "../../Helpers/apiCalls/appointmentApi"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Modal, Button } from "react-bootstrap"

//css
import "./Appointments.css"

//components
import Navbar from "../../components/Navbar/Navbar"
import Table from "../../components/Table/Table"
import Dropdown from "../../components/Dropdown/Dropdown"
import ViewAppointment from "../../components/ViewAppointment/ViewAppointment"
import ReturningPatientForm1 from "./Returning Patient/ReturningPatientForm1"

const actionOptions = [
  {
    label: "View Patient",
    value: "view-patient"
  },
  {
    label: "Add Treatment",
    value: "add-treatment"
  },
  {
    label: "Add Billing",
    value: "add-billing"
  },
  {
    label: "Add Prescription",
    value: "add-prescription"
  },
  {
    label: "Edit Appointment",
    value: "edit-appointment"
  },
  {
    label: "View Appointment",
    value: "view-appointment"
  }
]

const pendingActionOptions = [
  {
    label: "Approve",
    value: "approve"
  },
  {
    label: "Disapprove",
    value: "disapprove"
  },
]

const statusOptions = [
  {
    label: "ONGOING",
    value: "ONGOING",
    color: "blue"
  },
  {
    label: "UPCOMING",
    value: "UPCOMING",
    color: "yellow"
  },
  {
    label: "COMPLETED",
    value: "COMPLETED",
    color: "green"
  },
  {
    label: "CANCELED",
    value: "CANCELED",
    color: "red"
  }
]

function Appointments() {
  const [inactive, setInactive] = useState(false)
  const [actionSelected, setActionSelected] = useState("")
  const [statusSelected, setStatusSelected] = useState("")
  const [appointments, setAppointments] = useState([])
  const [pendingAppointments, setPendingAppointments] = useState([])
  const [status, setStatus] = useState("")

  //Select Width Customization
  const [approvedDate, setApprovedDate] = useState({from: getTodayDateISO(), to: getTodayDateISO()})
  const [pendingDate, setPendingDate] = useState("today")


  //Redirection
  const [toNewPatientForm, setToNewPatientForm] = useState(false)
  const [toReturningPatientForm, setToReturningPatientForm] = useState(false)

  async function approve(id) {
    const response = await approveAppointment(id);
    console.log(response);
    if(response) {
      toast.success("Successfully approved appointment.")
    }
  }
  async function disapprove(id) {
    const response = await disapproveAppointment(id);
    console.log(response);
    if(response) {
      toast.success("Successfully disapproved appointment.")
    }
  }

  async function fetchAppointments() {
    var color = ""
    console.log(approvedDate)
    const response = await getAppointments("", approvedDate, "APPROVED, ONGOING, CANCELED, COMPLETED, UPCOMING")
    console.log(response)
    response.data.data.data.map((data, index) => {
      var info = {}
      var date = new Date(data.appointment_date_time)
      console.log(data.appointment_date_time)
      var formattedDate = date.toDateString().split(" ")
      info.id = data.patient.id
      info.name =
        data.patient.first_name +
        " " +
        data.patient.middle_name +
        " " +
        data.patient.last_name
      info.time =
        formattedDate[1] + " " + formattedDate[2] + ", " + getTime(date)
      info.purpose = data.purpose
      info.payment = "unpaid"

      if (data.status === "UPCOMING") {
        color = "yellow"
      } else if (data.status === "ONGOING") {
        color = "blue"
      } else if (data.status === "COMPLETED") {
        color = "green"
      } else if (data.status === "CANCELED") {
        color = "red"
      } else {
        color = "grey"
      }

      info.status = statusBtn(data.id, data.status, color)
      info.action = actionBtn(data.id, data.patient.id)
      setAppointments((oldArray) => [...oldArray, info])
    })
    //setEditPatient(response.data.data.data)
  }

  async function updateStatus(id, status) {
    const response = await updateStatusAppointment(id, status)
    console.log(response)
  }

  async function fetchPendingAppointments() {
    var color = ""
    console.log(approvedDate)
    const response = await getPendingAppointments("", approvedDate, "PENDING")
    console.log(response)
    response.data.data.data.map((data, index) => {
      var info = {}
      var date = new Date(data.appointment_date_time)
      console.log(data.appointment_date_time)
      var formattedDate = date.toDateString().split(" ")
      info.id = data.patient.id
      info.name =
        data.patient.first_name +
        " " +
        data.patient.middle_name +
        " " +
        data.patient.last_name
      info.time =
        formattedDate[1] + " " + formattedDate[2] + ", " + getTime(date)
      info.purpose = data.purpose

      if (data.status === "PENDING") {
        color = "grey"
      } 
      info.action = pendingBtn(data.id, data.patient.id)
      setPendingAppointments((oldArray) => [...oldArray, info])
    })
    //setEditPatient(response.data.data.data)
  }

  async function updateStatus(id, status) {
    const response = await updateStatusAppointment(id, status)
    console.log(response)
  }

  //Buttons
  const statusBtn = (id, status, color) => {
    return (
      <Dropdown
        type={"status"}
        selected={statusSelected}
        setSelected={setStatusSelected}
        options={statusOptions}
        id={id}
        status={status}
        selectedColor={color}
      />
    )
  }

  const actionBtn = (id, patientId) => {
    return (
      <Dropdown
        type={"appointments"}
        selected={actionSelected}
        setSelected={setActionSelected}
        options={actionOptions}
        id={id}
        patientId={patientId}
      />
    )
  }

  const pendingBtn = (id, patientId) => {
    return (
      <Dropdown
        type={"appointments"}
        selected={actionSelected}
        setSelected={setActionSelected}
        options={pendingActionOptions}
        id={id}
        patientId={patientId}
      />
    )
  }

  //MODAL for View

  const [showViewAppointment, setShowViewAppointment] = useState(false)
  const handleViewAppointmentClose = () => setShowViewAppointment(false)
  const handleViewAppointmentShow = () => setShowViewAppointment(true)

  const [pendingData, setPendingData] = useState([
    {
      id: "",
      name: "Emil Lio",
      time: "09:05 AM",
      purpose: "Root Canal",
      action: pendingBtn(),
    },
    {
      id: "",
      name: "Juan Lio",
      time: "09:05 AM",
      purpose: "Cleaning",
      action: pendingBtn(),
    }
  ])

  React.useEffect(() => {
      fetchAppointments();
      fetchPendingAppointments();
  }, [approvedDate, statusSelected])

  React.useEffect(() => {
    updateStatus(statusSelected.appointment, statusSelected.value)
  }, [statusSelected])

  React.useEffect(() => {
    if (actionSelected.value === "view-appointment") {
      handleViewAppointmentShow()
      setActionSelected("")
    }

    if(actionSelected.value === "approve") {
      approve(actionSelected.appointment);
      setTimeout(function () {
        refreshPage();
      }, 2000)
    }
  
    if(actionSelected.value === "disapprove") {
      disapprove(actionSelected.appointment);
      setTimeout(function () {
        refreshPage();
      }, 2000)
    }

  }, [actionSelected.value])

  if(approvedDate == "other date") {
    return <Navigate to={"/appointments/search"}/>
  }

  if (toNewPatientForm == true) {
    return <Navigate to={"/new-patient-appointment"} />
  }

  if (toReturningPatientForm == true) {
    return <Navigate to={"/patients"} />
  }

  if (actionSelected.value === "view-patient") {
    return <Navigate to={"/view-patient/" + actionSelected.patient} />
  }

  if (actionSelected.value === "edit-appointment") {
    return (
      <Navigate
        to={
          "/edit-appointment/" +
          actionSelected.appointment +
          "/" +
          actionSelected.patientId
        }
      />
    )
  }

  if (actionSelected.value === "add-treatment") {
    return <Navigate to={"/add-treatment/" + actionSelected.patientId} />
  }

  return (
    <div className="page">
      <Navbar
        onCollapse={(inactive) => {
          setInactive(inactive)
        }}
        active={1} //Appointments navbar index
      />
      <ToastContainer />

      <Modal
        show={showViewAppointment}
        onHide={handleViewAppointmentClose}
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title> Appointment Details </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          Should display details in ViewAppointment ba but. Tried to copy how
          others did pero I only get white screen{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleViewAppointmentClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div className={`container ${inactive ? "inactive" : "active"}`}>
        <div className="row">
          <div className="col-sm-6">
            <h1 className="page-title">Appointments</h1>
          </div>
          <div className="col-sm-6 d-flex justify-content-end">
            <button
              className="appointment-btn"
              onClick={() => setToNewPatientForm(true)}
            >
              {" "}
              + NEW PATIENT
            </button>
            <button
              className="appointment-btn"
              onClick={() => setToReturningPatientForm(true)}
            >
              {" "}
              + RETURNING PATIENT
            </button>
          </div>
        </div>

        <div className="page-content margin-top-3">
          <div className="row">
            <div className="col">
              <Table
                type={"approved-appointments"}
                tableData={appointments}
                headingColumns={[
                  "ID",
                  "Name",
                  "Time",
                  "Purpose",
                  "Payment",
                  "Status",
                  "Action"
                ]}
                rowsPerPage={15}
                date={approvedDate}
                setDate={setApprovedDate}
              />
            </div>
            <div className="col">
              <Table
                type={"pending-appointments"}
                tableData={pendingAppointments}
                headingColumns={["ID","Name", "Time", "Purpose", "Action"]}
                rowsPerPage={15}
                date={pendingDate}
                setDate={setPendingDate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Appointments
