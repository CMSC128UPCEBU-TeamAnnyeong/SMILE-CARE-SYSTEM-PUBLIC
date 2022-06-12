import React, { useState } from "react"

//css
import "./newPatient.css"

//components
import Navbar from "../../../components/Navbar/Navbar"

function NewPatientForm1({
  patient,
  setPatient,
  medicalHistory,
  setMedicalHistory,
  navigation
}) {
  const [inactive, setInactive] = useState(false)
  const [selected, setSelected] = useState("")

  const {
    lastName,
    firstName,
    middleName,
    suffix,
    nickName,
    birthDate,
    sex,
    religion,
    city,
    nationality,
    streetAddress,
    occupation,
    dentalInsuranceId,
    dentalInsuranceEffectiveDate,
    homeNumber,
    officeNumber,
    faxNumber,
    mobileNumber,
    emailAddress
  } = patient

  function proceed() {
    if (
      firstName != "" &&
      lastName != "" &&
      middleName != "" &&
      birthDate != "" &&
      sex != "" &&
      religion != "" &&
      city != "" &&
      nationality != "" &&
      streetAddress != "" &&
      occupation != "" &&
      mobileNumber != ""
    ) {
      return (
        <div className="row">
          <div className="col d-flex justify-content-end">
            <button
              className="form-button-next"
              onClick={() => navigation.next()}
            >
              NEXT
            </button>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="page">
      <div className={`container ${inactive ? "inactive" : "active"}`}>
        <div className="row page-content">
          <div className="form-card-cont">
            <div className="row">
              <h1 className="peronal-info-header">Personal Information</h1>
            </div>
            <div className="row mt-4">
              <div className="col-sm-4">
                <span className="form-label">Last Name</span>
                <br />
                <input
                  type="text"
                  className="form-input last-name-input"
                  name="lastName"
                  value={lastName}
                  onChange={setPatient}
                />
              </div>
              <div className="col-sm-4">
                <span className="form-label">First Name</span>
                <br />
                <input
                  type="text"
                  className="form-input first-name-input"
                  name="firstName"
                  value={firstName}
                  onChange={setPatient}
                />
              </div>
              <div className="col-sm-4">
                <span className="form-label">Middle Name</span>
                <br />
                <input
                  type="text"
                  className="form-input middle-name-input"
                  name="middleName"
                  value={middleName}
                  onChange={setPatient}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-sm-2">
                <span className="form-label">Suffix</span>
                <br />
                <input
                  type="text"
                  className="form-input nick-name-input"
                  name="suffix"
                  value={suffix}
                  onChange={setPatient}
                />
              </div>
              <div className="col-sm-2">
                <span className="form-label">NickName</span>
                <br />
                <input
                  type="text"
                  className="form-input nick-name-input"
                  name="nickName"
                  value={nickName}
                  onChange={setPatient}
                />
              </div>
              <div className="col-sm-4">
                <span className="form-label">Birthdate</span>
                <br />
                <input
                  type="date"
                  className="form-input birthdate-input"
                  name="birthDate"
                  value={birthDate}
                  onChange={setPatient}
                />
              </div>
              <div className="col-sm-4">
                <span className="form-label">Sex</span>
                <br />
                <select
                  className="form-input sex-input"
                  name="sex"
                  value={sex}
                  onChange={setPatient}
                >
                  <option value="">Select</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
              </div>
            </div>
            <div className="row mt-2 personal-input-cont">
              <div className="col-sm-4">
                <span className="form-label">Religion</span>
                <br />
                <input
                  type="text"
                  className="form-input religion-input"
                  name="religion"
                  value={religion}
                  onChange={setPatient}
                />
              </div>
              <div className="col-sm-3">
                <span className="form-label">Nationality</span>
                <br />
                <input
                  type="text"
                  className="form-input nationality-input"
                  name="nationality"
                  value={nationality}
                  onChange={setPatient}
                />
              </div>
              <div className="col-sm-3">
                <span className="form-label">Street Address</span>
                <br />
                <input
                  type="text"
                  className="form-input street-address-input"
                  name="streetAddress"
                  value={streetAddress}
                  onChange={setPatient}
                />
              </div>
              <div className="col-sm-2">
                <span className="form-label">City</span>
                <br />
                <input
                  type="text"
                  className="form-input city-input"
                  name="city"
                  value={city}
                  onChange={setPatient}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-sm-4">
                <span className="form-label">Occupation</span>
                <br />
                <input
                  type="text"
                  className="form-input occupation-input"
                  name="occupation"
                  value={occupation}
                  onChange={setPatient}
                />
              </div>
              <div className="col-sm-4">
                <span className="form-label">Dental Insurance ID</span>
                <br />
                <input
                  type="text"
                  className="form-input dental-insurance-input"
                  name="dentalInsuranceId"
                  value={dentalInsuranceId}
                  onChange={setPatient}
                />
              </div>
              <div className="col-sm-4">
                <span className="form-label">
                  Dental Insurance Effective Date
                </span>
                <br />
                <input
                  type="date"
                  className="form-input birthdate-input"
                  name="dentalInsuranceEffectiveDate"
                  value={dentalInsuranceEffectiveDate}
                  onChange={setPatient}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-sm-3">
                <span className="form-label">Home Number</span>
                <br />
                <input
                  type="text"
                  className="form-input home-number-input"
                  name="homeNumber"
                  value={homeNumber}
                  n
                  onChange={setPatient}
                />
              </div>
              <div className="col-sm-4">
                <span className="form-label">Office Number</span>
                <br />
                <input
                  type="text"
                  className="form-input office-number-input"
                  name="officeNumber"
                  value={officeNumber}
                  onChange={setPatient}
                />
              </div>
              <div className="col-sm-5">
                <span className="form-label">Fax Number</span>
                <br />
                <input
                  type="text"
                  className="form-input fax-number-input"
                  name="faxNumber"
                  value={faxNumber}
                  onChange={setPatient}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-sm-6">
                <span className="form-label">Mobile Number</span>
                <br />
                <input
                  type="text"
                  className="form-input mobile-number-input"
                  name="mobileNumber"
                  value={mobileNumber}
                  onChange={setPatient}
                />
              </div>
              <div className="col-sm-6">
                <span className="form-label">Email Address</span>
                <br />
                <input
                  type="text"
                  className="form-input email-address-input"
                  name="emailAddress"
                  value={emailAddress}
                  onChange={setPatient}
                />
              </div>
            </div>

            {proceed()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewPatientForm1
