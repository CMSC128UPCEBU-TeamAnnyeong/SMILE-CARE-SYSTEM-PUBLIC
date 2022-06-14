import React from "react"

//css
import "./newPatient.css"

function NewPatientForm2({
  patient,
  setPatient,
  medicalHistory,
  setMedicalHistory,
  navigation
}) {
  const inactive = false

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

  const renderPreviousPhysicianField = ({ title, name, value, onChange }) => {
    return (
      <div className="previous-physician-field">
        <div className="previous-physician-field-title">{title}</div>
        <input
          type="text"
          className="previous-physician-field-input"
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    )
  }

  const renderPreviousPhysicianFields = () => {
    return (
      <div className="previous-physician-fields">
        {renderPreviousPhysicianField({
          title: "Name of Physician",
          name: "physician",
          value: physician,
          onChange: setMedicalHistory
        })}
        {renderPreviousPhysicianField({
          title: "Office Address",
          name: "physicianOfficeAddress",
          value: physicianOfficeAddress,
          onChange: setMedicalHistory
        })}
        {renderPreviousPhysicianField({
          title: "Specialty",
          name: "physicianSpecialty",
          value: physicianSpecialty,
          onChange: setMedicalHistory
        })}
      </div>
    )
  }

  const renderMedicalHistoryInformationSection = () => {
    return (
      <div className="section">
        <div className="section-title">Previous Physician</div>
        <div className="section-body">{renderPreviousPhysicianFields()}</div>
      </div>
    )
  }

  const renderCurrentConditionSection = () => {
    return (
      <div className="section">
        <div className="section-title">Current Condition</div>
        <div className="section-body">
          {renderQuestionField({
            name: "inGoodHealth",
            question: "Are you in good health?",
            value: inGoodHealth,
            onChange: setMedicalHistory
          })}
          {renderQuestionField({
            name: "isUnderTreatment",
            question: "Are you under treatment now?",
            value: isUnderTreatment,
            onChange: setMedicalHistory,
            specificDetails: {
              placeholder: "Condition Being Treated"
            }
          })}
          {renderQuestionField({
            name: "hasIllnessOrSurgery",
            question:
              "Have you ever had serious illness or surgical operation?",
            value: hasIllnessOrSurgery,
            onChange: setMedicalHistory
          })}
          {renderQuestionField({
            name: "isHospitalized",
            question: "Have you ever been hospitalize?",
            value: isHospitalized,
            onChange: setMedicalHistory
          })}
          {renderQuestionField({
            name: "isTakingPrescription",
            question:
              "Are you taking any prescription/non-prescription medication?",
            value: isTakingPrescription,
            onChange: setMedicalHistory,
            specificDetails: {
              placeholder: "Please specify"
            }
          })}
          {renderQuestionField({
            name: "isUsingTabacco",
            question: "Do you use Tabacco products?",
            value: isUsingTabacco,
            onChange: setMedicalHistory
          })}
          {renderQuestionField({
            name: "isUsingDangerousDrugs",
            question: "Do you use alcohol, cocaine or other dangerous drugs?",
            value: isUsingDangerousDrugs,
            onChange: setMedicalHistory
          })}
          {renderQuestionField({
            name: "isAllergictoMentionedDrugs",
            question:
              "Are you allergic to any of the following (Local Anesthetic, Penicillin, Antibiotics, Sulfa drugs, Aspirin, Latex, Others...)?",
            value: isAllergictoMentionedDrugs,
            onChange: setMedicalHistory,
            specificDetails: {
              placeholder: "Please specify"
            }
          })}
        </div>
      </div>
    )
  }

  const renderQuestionField = ({
    name,
    question,
    value,
    onChange,
    specificDetails = null
  }) => {
    return (
      <div className="question-field">
        <div className="question-section">
          <div className="question">{question}</div>
          <div className="choices">
            <div className="choice">
              <input
                type="radio"
                name={name}
                value="yes"
                checked={value === "yes"}
                onChange={onChange}
              />
              <div className="text">Yes</div>
            </div>
            <div className="choice">
              <input
                type="radio"
                name={name}
                value="no"
                checked={value === "no"}
                onChange={onChange}
              />
              <div className="text">No</div>
            </div>
          </div>
        </div>
        {specificDetails && value === "yes" && (
          <div className="specific-details-section">
            <input
              type="text"
              onChange={onChange}
              name="specifiedTreatment"
              placeholder={specificDetails.placeholder}
            />
          </div>
        )}
      </div>
    )
  }

  const renderButtons = () => {
    if (
      !inGoodHealth ||
      !isUnderTreatment ||
      !hasIllnessOrSurgery ||
      !isHospitalized ||
      !isTakingPrescription ||
      !isUsingTabacco ||
      !isUsingDangerousDrugs ||
      !isAllergictoMentionedDrugs
    ) {
      return
    }

    return (
      <div className="buttons">
        <button className="button back" onClick={() => navigation.previous()}>
          BACK
        </button>
        <button className="button next" onClick={() => navigation.next()}>
          NEXT
        </button>
      </div>
    )
  }

  return (
    <div className="page">
      <div className={`container ${inactive ? "inactive" : "active"}`}>
        <div className="medical-form-card-cont">
          <div className="medical-info-header">Medical History Information</div>
          {renderMedicalHistoryInformationSection()}
          {renderCurrentConditionSection()}
          {renderButtons()}
        </div>
      </div>
    </div>
  )
}
export default NewPatientForm2
