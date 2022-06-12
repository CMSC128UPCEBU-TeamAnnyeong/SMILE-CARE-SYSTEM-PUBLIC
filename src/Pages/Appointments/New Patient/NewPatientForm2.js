import React, { useState } from "react"

//css
import "./newPatient.css"

function NewPatientForm2({
  patient,
  setPatient,
  medicalHistory,
  setMedicalHistory,
  navigation
}) {
  const [inactive, setInactive] = useState(false)

  const {
    physician,
    physicianOfficeAddress,
    physicianSpecialty,
    inGoodHealth,
    isUnderTreatment,
    hasIllnessOrSurgery,
    isHospitalized,
    isTakingPrescription,
    isUsingTabacco,
    isUsingDangerousDrugs,
    isAllergictoMentionedDrugs
  } = medicalHistory

  function proceed() {
    if (
      inGoodHealth !== "" &&
      isUnderTreatment !== "" &&
      hasIllnessOrSurgery !== "" &&
      isHospitalized !== "" &&
      isTakingPrescription !== "" &&
      isUsingTabacco !== "" &&
      isUsingDangerousDrugs !== "" &&
      isAllergictoMentionedDrugs !== ""
    ) {
      return (
        <div className="row">
          <div className="col d-flex justify-content-end">
            <button
              className="form-button-previous"
              onClick={() => navigation.previous()}
            >
              BACK
            </button>
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
          <div className="medical-form-card-cont">
            <div className="row">
              <h1 className="medical-info-header">
                Medical History Information
              </h1>
            </div>
            <div className="row mt-4">
              <span className="physician-label">Previous Physician</span>
              <br />
            </div>
            <div className="row mt-4">
              <div className="col-sm-4">
                <span className="medical-form-label">Name of Physician</span>
                <br />
                <input
                  type="text"
                  className="form-input last-name-input"
                  name="physician"
                  value={physician}
                  onChange={setMedicalHistory}
                />
              </div>
              <div className="col-sm-4">
                <span className="medical-form-label">Office Address</span>
                <br />
                <input
                  type="text"
                  className="form-input first-name-input"
                  name="physicianOfficeAddress"
                  value={physicianOfficeAddress}
                  onChange={setMedicalHistory}
                />
              </div>
              <div className="col-sm-4">
                <span className="medical-form-label">Specialty</span>
                <br />
                <input
                  type="text"
                  className="form-input middle-name-input"
                  name="physicianSpecialty"
                  value={physicianSpecialty}
                  onChange={setMedicalHistory}
                />
              </div>
            </div>
            <div className="row mt-4">
              <span className="current-condition">Current Condition</span>
              <br />
            </div>
            <div className="row mt-4">
              <div className="col-sm-8">
                <p className="questions">Are you in good health?</p>
                <br />
              </div>
              <div className="col-sm-1">
                <div className="response-yes">
                  <input
                    type="radio"
                    name="inGoodHealth"
                    value="yes"
                    checked={inGoodHealth === "yes"}
                    onChange={setMedicalHistory}
                  />
                  Yes
                </div>
              </div>
              <div className="col-sm-1">
                <div className="response-no">
                  <input
                    type="radio"
                    name="inGoodHealth"
                    value="no"
                    checked={inGoodHealth === "no"}
                    onChange={setMedicalHistory}
                  />
                  No
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-sm-8">
                <p className="questions">Are you under treatment now?</p>
                <br />
              </div>
              <div className="col-sm-1">
                <div className="response-yes">
                  <input
                    type="radio"
                    name="isUnderTreatment"
                    value="yes"
                    checked={isUnderTreatment === "yes"}
                    onChange={setMedicalHistory}
                  />
                  Yes
                </div>
              </div>
              <div className="col-sm-1">
                <div className="response-no">
                  <input
                    type="radio"
                    name="isUnderTreatment"
                    value="no"
                    checked={isUnderTreatment === "no"}
                    onChange={setMedicalHistory}
                  />
                  No
                </div>
              </div>
              <div className="col-sm-8">
                {isUnderTreatment === "yes" &&
                  (<input
                  type="text"
                  onChange={setMedicalHistory}
                  name="specifiedTreatment"
                  className="condTextInputCont"
                  placeholder="Condition Being Treated"
                />)}
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-sm-8">
                <p className="questions">
                  Have you ever had serious illness or surgical operation?
                </p>
                <br />
              </div>
              <div className="col-sm-1">
                <div className="response-yes">
                  <input
                    type="radio"
                    name="hasIllnessOrSurgery"
                    value="yes"
                    checked={hasIllnessOrSurgery === "yes"}
                    onChange={setMedicalHistory}
                  />
                  Yes
                </div>
              </div>
              <div className="col-sm-1">
                <div className="response-no">
                  <input
                    type="radio"
                    name="hasIllnessOrSurgery"
                    value="no"
                    checked={hasIllnessOrSurgery === "no"}
                    onChange={setMedicalHistory}
                  />
                  No
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-sm-8">
                <p className="questions">Have you ever been hospitalize?</p>
                <br />
              </div>
              <div className="col-sm-1">
                <div className="response-yes">
                  <input
                    type="radio"
                    name="isHospitalized"
                    value="yes"
                    checked={isHospitalized === "yes"}
                    onChange={setMedicalHistory}
                  />
                  Yes
                </div>
              </div>
              <div className="col-sm-1">
                <div className="response-no">
                  <input
                    type="radio"
                    name="isHospitalized"
                    value="no"
                    checked={isHospitalized === "no"}
                    onChange={setMedicalHistory}
                  />
                  No
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-sm-8">
                <p className="questions">
                  Are you taking any prescription/non-prescription medication?
                </p>
                <br />
              </div>
              <div className="col-sm-1">
                <div className="response-yes">
                  <input
                    type="radio"
                    name="isTakingPrescription"
                    value="yes"
                    checked={isTakingPrescription === "yes"}
                    onChange={setMedicalHistory}
                  />
                  Yes
                </div>
              </div>
              <div className="col-sm-1">
                <div className="response-no">
                  <input
                    type="radio"
                    name="isTakingPrescription"
                    value="no"
                    checked={isTakingPrescription === "no"}
                    onChange={setMedicalHistory}
                  />
                  No
                </div>
              </div>
              <div className="col-sm-8">
                {isTakingPrescription === "yes" &&
                  (<input
                  type="text"
                  onChange={setMedicalHistory}
                  name="specifiedPrescription"
                  className="condTextInputCont"
                  placeholder="Please Specify"
                />)}
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-sm-8">
                <p className="questions">Do you use Tabacco products?</p>
                <br />
              </div>
              <div className="col-sm-1">
                <div className="response-yes">
                  <input
                    type="radio"
                    name="isUsingTabacco"
                    value="yes"
                    checked={isUsingTabacco === "yes"}
                    onChange={setMedicalHistory}
                  />
                  Yes
                </div>
              </div>
              <div className="col-sm-1">
                <div className="response-no">
                  <input
                    type="radio"
                    name="isUsingTabacco"
                    value="no"
                    checked={isUsingTabacco === "no"}
                    onChange={setMedicalHistory}
                  />
                  No
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-sm-8">
                <p className="questions">
                  Do you use alcohol, cocaine or other dangerous drugs?
                </p>
                <br />
              </div>
              <div className="col-sm-1">
                <div className="response-yes">
                  <input
                    type="radio"
                    name="isUsingDangerousDrugs"
                    value="yes"
                    checked={isUsingDangerousDrugs === "yes"}
                    onChange={setMedicalHistory}
                  />
                  Yes
                </div>
              </div>
              <div className="col-sm-1">
                <div className="response-no">
                  <input
                    type="radio"
                    name="isUsingDangerousDrugs"
                    value="no"
                    checked={isUsingDangerousDrugs === "no"}
                    onChange={setMedicalHistory}
                  />
                  No
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-sm-8">
                <p className="questions">
                  Are you allergic to any of the following (Local Anesthetic,
                  Penicillin, Antibiotics, Sulfa drugs, Aspirin, Latex,
                  Others...)?
                </p>
                <p></p>
                <br />
              </div>
              <div className="col-sm-1">
                <div className="response-yes">
                  <input
                    type="radio"
                    name="isAllergictoMentionedDrugs"
                    value="yes"
                    checked={isAllergictoMentionedDrugs === "yes"}
                    onChange={setMedicalHistory}
                  />
                  Yes
                </div>
              </div>
              <div className="col-sm-1">
                <div className="response-no">
                  <input
                    type="radio"
                    name="isAllergictoMentionedDrugs"
                    value="no"
                    checked={isAllergictoMentionedDrugs === "no"}
                    onChange={setMedicalHistory}
                  />
                  No
                </div>
              </div>
              <div className="col-sm-8">
                {isAllergictoMentionedDrugs === "yes" &&
                  (<input
                  type="text"
                  onChange={setMedicalHistory}
                  //value={amountPaid}
                  name="specifiedAllergies"
                  className="condTextInputCont"
                  placeholder="Please Specify"
                />)}
              </div>
            </div>
            <div className="row">{proceed()}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default NewPatientForm2
