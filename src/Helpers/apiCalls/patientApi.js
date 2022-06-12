import {
  getAPICall,
  postAPICall,
  putAPICall,
  deleteAPICall
} from "./axiosMethodCalls"

/******************************
 * PATIENT AND MEDICAL HISTORY
 *****************************/

//POST
export const createPatient = async (
  patient,
  medicalHistory,
  sickness,
  agreement
) => {
  try {
    const response = await postAPICall(
      process.env.REACT_APP_LINK + "patients",
      {
        first_name: patient.firstName,
        middle_name: patient.middleName,
        last_name: patient.lastName,
        suffix: patient.suffix,
        nick_name: patient.nickName,
        birthdate: patient.birthDate,
        sex: patient.sex,
        religion: patient.religion,
        nationality: patient.nationality,
        city: patient.city,
        street_address: patient.streetAddress,
        occupation: patient.occupation,
        dental_insurance_id: patient.dentalInsuranceId,
        dental_insurance_effective_date: patient.dentalInsuranceEffectiveDate,
        home_number: patient.homeNumber,
        office_number: patient.officeNumber,
        fax_number: patient.faxNumber,
        mobile_number: patient.mobileNumber,
        email: patient.emailAddress,
        physician: medicalHistory.physician,
        physician_office_address: medicalHistory.physicianOfficeAddress,
        physician_specialty: medicalHistory.physicianSpecialty,
        in_good_health: medicalHistory.inGoodHealth,
        is_under_treatment: medicalHistory.isUnderTreatment,
        has_illness_or_surgery: medicalHistory.hasIllnessOrSurgery,
        is_hopitalized: medicalHistory.isHospitalized,
        is_taking_prescription: medicalHistory.isTakingPrescription,
        is_using_tabacco: medicalHistory.isUsingTabacco,
        is_using_dangerous_drugs: medicalHistory.isUsingDangerousDrugs,
        is_allergic_to_mentioned_drugs:
          medicalHistory.isAllergictoMentionedDrugs,
        bleeding_time: medicalHistory.bleedingTime,
        blood_type: medicalHistory.bloodType,
        blood_pressure: medicalHistory.bloodPressure,
        has_history: sickness,
        signature: agreement
      }
    )
    return { data: response.data }
  } catch (error) {
    return { error: error }
  }
}

export const updatePatient = async (id, patient, sickness) => {
  try {
    const response = await putAPICall(
      process.env.REACT_APP_LINK + "patients/" + id,
      {
        first_name: patient.first_name,
        middle_name: patient.middle_name,
        last_name: patient.last_name,
        suffix: patient.suffix,
        nick_name: patient.nick_name,
        birthdate: patient.birthdate,
        sex: patient.sex,
        religion: patient.religion,
        nationality: patient.nationality,
        city: patient.city,
        street_address: patient.street_address,
        occupation: patient.occupation,
        dental_insurance_id: patient.dental_insurance_id,
        dental_insurance_effective_date:
          patient.dental_insurance_effective_date,
        home_number: patient.home_number,
        office_number: patient.office_number,
        fax_number: patient.fax_number,
        mobile_number: patient.mobile_number,
        email: patient.email,
        physician: patient.physician,
        physician_office_address: patient.physician_office_address,
        physician_specialty: patient.physician_specialty,
        in_good_health: patient.in_good_health,
        is_under_treatment: patient.is_under_treatment,
        has_illness_or_surgery: patient.has_illness_or_surgery,
        is_hopitalized: patient.is_hospitalized,
        is_taking_prescription: patient.is_taking_prescription,
        is_using_tabacco: patient.is_using_tabacco,
        is_using_dangerous_drugs: patient.is_using_dangerous_drugs,
        is_allergic_to_mentioned_drugs: patient.is_allergic_to_mentioned_drugs,
        bleeding_time: patient.bleeding_time,
        blood_type: patient.blood_type,
        blood_pressure: patient.blood_pressure,
        has_history: sickness
      }
    )
    return { data: response.data }
  } catch (error) {
    return { error: error }
  }
}

//GET
export const getPatients = async () => {
  try {
    const response = await getAPICall(process.env.REACT_APP_LINK + "patients")
    return { data: response }
  } catch (error) {
    return { error: error }
  }
}

//for search
export const getPatient = async (id) => {
  try {
    const response = await getAPICall(
      process.env.REACT_APP_LINK + "patients/" + id
    )
    return { data: response }
  } catch (error) {
    return { error: error }
  }
}

export const getPatientByShortId = async (id) => {
  try {
    const response = await getAPICall(
      process.env.REACT_APP_LINK + "patients/short/" + id
    )
    return { data: response }
  } catch (error) {
    return { error: error }
  }
}

//for search
export const searchPatient = async (name) => {
  try {
    const response = await getAPICall(
      process.env.REACT_APP_LINK + "patients?searchText=" + name
    )
    return { data: response }
  } catch (error) {
    return { error: error }
  }
}
