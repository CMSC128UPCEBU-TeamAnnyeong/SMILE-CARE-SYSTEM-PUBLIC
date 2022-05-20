import React, { useState } from 'react';
import { useForm, useStep } from 'react-hooks-helper';
import NewPatientForm1 from './NewPatientForm1';
import NewPatientForm2 from './NewPatientForm2';
import NewPatientForm3 from './NewPatientForm3';
import NewPatientForm4 from './NewPatientForm4';

const personalData = {
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    nickName: "",
    birthDate: "", 
    sex: "",
    religion: "",
    nationality: "",
    city: "",
    streetAddress: "",
    occupation: "",
    dentalInsuranceId: "",
    dentalInsuranceEffectiveDate: "",
    homeNumber: "",
    officeNumber: "",
    faxNumber: "",
    mobileNumber: "",
    emailAddress: "",
};

const medicalHistoryInformation = {
    physician: "",
    physicianOfficeAddress: "", 
    physicianSpecialty: "",
    inGoodHealth: "",
    isUnderTreatment: "",
    hasIllnessOrSurgery: "",
    isHospitalized: "",
    isTakingPrescription: "",
    isUsingTabacco: "",
    isUsingDangerousDrugs: "",
    isAllergictoMentionedDrugs: "",
    bleedingTime: "",
    bloodType: "",
    bloodPressure: "",
}

const appointmentData = {
    appointmentDateTime: new Date(),
    remarks: "",
}

const serviceData = {};

const steps = [
    {id: "patient"},
    {id: "medical-history-1"},
    {id: "medical-history-2"},
    {id: "appointment"},
]

function NewPatientSwitchForm() {

    const [patient, setPatient] = useForm(personalData);
    const [medicalHistory, setMedicalHistory] = useForm(medicalHistoryInformation);
    const [sickness, setSickness] = useState([]);
    const [appointment, setAppointment] = useForm(appointmentData);
    const [services, setServices] = useState([]);
    const [category, setCategory] = useState([]);
    const [agreement, setAgreement] = useState("");
    const [notes, setNotes] = useState("");

    const {step, navigation} = useStep({
        steps,
        initialStep: 0,
    });

    const personalProps = { patient, setPatient, medicalHistory, setMedicalHistory, sickness, setSickness, agreement, setAgreement, navigation};
    const appointmentProps =  { patient, services, medicalHistory, agreement,sickness, setServices, category, setCategory, appointment, setAppointment, notes, setNotes, navigation};

    switch (step.id) {
        case "patient":
            return <NewPatientForm1 {...personalProps}/>
        case "medical-history-1":
            return <NewPatientForm2 {...personalProps}/>
        case "medical-history-2":
            return <NewPatientForm3 {...personalProps}/>
        case "appointment":
            return <NewPatientForm4 {...appointmentProps}/>   
    }

  return (
    <div></div>
  )
}

export default NewPatientSwitchForm