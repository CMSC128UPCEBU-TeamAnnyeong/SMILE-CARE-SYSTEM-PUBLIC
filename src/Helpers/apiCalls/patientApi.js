 import {
  getAPICall,
  postAPICall,
  putAPICall,
  deleteAPICall,
  postAPICallMulti
} from "./axiosMethodCalls"

/******************************
 * PATIENT AND MEDICAL HISTORY
 *****************************/

//POST
export const createPatient = async (
  patient,
  medicalHistory,
  sickness,
  agreement,
  profilePicture
) => {
  const data = new FormData()
  data.append("first_name", patient.firstName)
  data.append("middle_name", patient.middleName)
  data.append("last_name", patient.lastName)
  data.append("suffix", patient.suffix)
  data.append("nick_name", patient.nickName)
  data.append("birthdate", patient.birthDate)
  data.append("sex", patient.sex)
  data.append("religion", patient.religion)
  data.append("nationality", patient.nationality)
  data.append("city", patient.city)
  data.append("street_address", patient.streetAddress)
  data.append("occupation", patient.occupation)
  data.append("dental_insurance_id", patient.dentalInsuranceId)
  data.append(
    "dental_insurance_effective_date",
    patient.dentalInsuranceEffectiveDate
  )
  data.append("home_number", patient.homeNumber)
  data.append("office_number", patient.officeNumber)
  data.append("fax_number", patient.faxNumber)
  data.append("mobile_number", patient.mobileNumber)
  data.append("email", patient.emailAddress)
  data.append("physician", medicalHistory.physician)
  data.append("physician_office_address", medicalHistory.physicianOfficeAddress)
  data.append("physician_specialty", medicalHistory.physicianSpecialty)
  data.append("in_good_health", medicalHistory.inGoodHealth)
  data.append("is_under_treatment", medicalHistory.isUnderTreatment)
  data.append("has_illness_or_surgery", medicalHistory.hasIllnessOrSurgery)
  data.append("is_hopitalized", medicalHistory.isHospitalized)
  data.append("is_taking_prescription", medicalHistory.isTakingPrescription)
  data.append("is_using_tabacco", medicalHistory.isUsingTabacco)
  data.append("is_using_dangerous_drugs", medicalHistory.isUsingDangerousDrugs)
  data.append(
    "is_allergic_to_mentioned_drugs",
    medicalHistory.isAllergictoMentionedDrugs
  )
  data.append("bleeding_time", medicalHistory.bleedingTime)
  data.append("blood_type", medicalHistory.bloodType)
  data.append("blood_pressure", medicalHistory.bloodPressure)
  data.append("has_history", JSON.stringify(sickness))
  data.append("signature", agreement)
  data.append("specified_treatment", medicalHistory.specifiedTreatment)
  data.append("specified_prescriptions", medicalHistory.specifiedPrescription)
  data.append("specified_allergies", medicalHistory.specifiedAllergies)
  data.append("profile_picture", profilePicture[0])

  try {
    const response = await postAPICallMulti(
      process.env.REACT_APP_LINK + "patients",
      data
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
        specified_treatment: patient.specified_treatment,
        has_illness_or_surgery: patient.has_illness_or_surgery,
        is_hopitalized: patient.is_hospitalized,
        is_taking_prescription: patient.is_taking_prescription,
        specified_prescriptions: patient.specified_prescriptions,
        is_using_tabacco: patient.is_using_tabacco,
        is_using_dangerous_drugs: patient.is_using_dangerous_drugs,
        is_allergic_to_mentioned_drugs: patient.is_allergic_to_mentioned_drugs,
        specified_allergies: patient.specified_allergies,
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
export const getPatients = async (name, date) => {
  try {
    console.log(name)
    console.log(date)
    const dateFrom = date.from ? date.from : ""
    const dateTo = date.to ? date.to : ""

    const response = await getAPICall(
      process.env.REACT_APP_LINK +
        "patients?searchText=" +
        name +
        "&dateFrom=" +
        dateFrom +
        "&dateTo=" +
        dateTo
    )
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

