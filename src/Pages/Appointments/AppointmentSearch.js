import React, { useState } from "react"
import { getTime, getTodayDateISO, refreshPage, subtractDays } from "../../Helpers/Utils/Common"
import { getPatients, searchPatient } from "../../Helpers/apiCalls/patientApi"
import { Navigate } from "react-router-dom"


//css
import "./Appointments.css"

//components
import Navbar from "../../components/Navbar/Navbar"
import WelcomeCard from "../../components/WelcomeCard/WelcomeCard"
import Table from "../../components/Table/Table"
import Header from "../../components/Header/Header"
import Dropdown from "../../components/Dropdown/Dropdown"
import { getAppointments } from "../../Helpers/apiCalls/appointmentApi"

const headers = [
    {label: 'ID', key: 'id'},
    {label: 'NAME', key: 'name'},
    {label: 'TIME', key: 'time'},
    {label: 'PURPOSE', key: 'purpose'},
    {label: 'PAYMENT', key: 'payment'},
];

function AppointmentSearch() {
  const [inactive, setInactive] = useState(false)
  const [selected, setSelected] = useState("")
  const [appointments, setAppointments] = useState([])

  //Select Width Customization
  const [date, setDate] = useState({
    from: "",
    to: "",
})

const handleChange = e => {
  const { name, value } = e.target;
  setDate(prevState => ({
      ...prevState,
      [name]: value
  }));
};

const [rows, setRows] = useState(10)
const [name, setName] = useState("")

  const options = [
    {
      label: "View Patient",
      value: "view"
    },
    {
        label: "View Appointment",
        value: "view-appointment"
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
        label: "Edit Patient",
        value: "edit-patient"
    },
    {
        label: "Edit Appointment",
        value: "edit-appointment"
    },
  ]


  const actionBtn = (id, patientId) => {
    return (
      <Dropdown
        type={"appointments"}
        selected={selected}
        setSelected={setSelected}
        options={options}
        id={id}
        patientId={patientId}
      />
    )
  }

  async function fetchAppointments() {
    var color = "";
    setAppointments([])
      const response = await getAppointments(name, date, "APPROVED, ONGOING, CANCELED, COMPLETED, UPCOMING");
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
        info.purpose = data.services[0]
        info.payment = "unpaid"
  
  
        if(data.status === 'UPCOMING') {
          color = "yellow"
        }
        else if(data.status === 'ONGOING') {
          color = "blue"
        }
        else if(data.status === 'COMPLETED') {
          color = "green"
        }
        else if(data.status === 'CANCELED') {
          color = "red"
        }
  
        info.action = actionBtn(data.id, data.patient.id)
        setAppointments((oldArray) => [...oldArray, info])
      })
    //setEditPatient(response.data.data.data)
  }

  const [clickSearch, setClickSearch] = useState(false)

  React.useEffect(() => {
    fetchAppointments();
  }, [date,clickSearch])


  

  if (selected.value === "view") {
    return (
      <Navigate to={"/view-patient/" + selected.patient} />
    )
  }

  if (selected.value === "add-appointment") {
    return (
      <Navigate to={"/returning-patient-appointment/" + selected.patient} />
    )
  }

  if (selected.value === "edit-patient") {
    return <Navigate to={"/edit-patient/" + selected.patient} />
  }

  if(selected.value === "edit-appointment") {
    return <Navigate
    to={
      "/edit-appointment/" +
      selected.appointment +
      "/" +
      selected.patientId
    }
  />
  }

  if (selected.value === "add-treatment") {
    return <Navigate to={"/add-treatment/" + selected.patient} />
  }

  if (selected.value === "add-prescription") {
    return <Navigate to={"/add-prescription/" + selected.patient} />
  }


  return (
    <div className="page">
      <Navbar
        onCollapse={(inactive) => {
          setInactive(inactive)
        }}
        active={1} //Appointment navbar index
      />
      <div className={`container ${inactive ? "inactive" : "active"}`}>
        <div className="row">
          <div className="col-sm-6">
            <h1 className="page-title-patients">Appointments</h1>
          </div>
        </div>
        <div className="row">
          <Header
            name={name}
            setName={setName}
            clickSearch={clickSearch}
            setClickSearch={setClickSearch}
            headers={headers}
            data={appointments}
          />
        </div>
        <div className="page-content">
          <div className="row d-flex justify-content-center">
            <div className="col-sm-11">
              <Table
                type={"approved-appointments-search"}
                tableData={appointments}
                headingColumns={[
                    "ID",
                    "NAME",
                    "TIME",
                    "PURPOSE",
                    "PAYMENT",
                    "ACTION"
                ]}
                rowsPerPage={rows}
                date={date}
                setDate={handleChange}
                setRows={setRows}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppointmentSearch
