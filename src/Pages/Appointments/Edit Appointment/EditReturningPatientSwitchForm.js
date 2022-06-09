import React, { useState } from 'react';
import { useForm, useStep } from 'react-hooks-helper';
import EditReturningPatientForm1 from './EditReturningPatientForm1';

const personalData = {
    lastName: "",
    firstName: "",
    middleName: "",
    birthDate: "",
    sex: "",
    city: "",
    streetAddress: "",
    homeNumber: "",
    officeNumber: "",
    mobileNumber: "",
    emailAddress: "",
};

const serviceData = {};

const steps = [
    {id: "patient"},
    {id: "medical-history-1"},
    {id: "medical-history-2"},
    {id: "appointment"},
]

function EditReturningPatientSwitchForm() {
    const [patient, setPatient] = useForm(personalData);
    const [sickness, setSickness] = useState([]);
    const [appointment, setAppointment] = useState(new Date())
    const [services, setServices] = useState("");
    const [category, setCategory] = useState([]);
    const [notes, setNotes] = useState("");

    const {step, navigation} = useStep({
        steps,
        initialStep: 0,
    })

    const personalProps = { patient, setPatient, sickness, setSickness, appointment, setAppointment, notes, setNotes, services, setServices, category, setCategory,navigation};
    const appointmentProps =  { services, setServices, appointment, setAppointment, category, setCategory,navigation};

    switch (step.id) {
        case "patient":
            return <EditReturningPatientForm1 {...personalProps}/>
    }

  return (
    <div></div>
  )
}

export default EditReturningPatientSwitchForm