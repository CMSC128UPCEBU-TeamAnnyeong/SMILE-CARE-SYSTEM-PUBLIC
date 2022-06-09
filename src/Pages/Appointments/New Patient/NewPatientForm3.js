import React, { useState } from "react"
import { MultiSelect } from "react-multi-select-component"
import { Button, Modal } from "react-bootstrap"
import SignatureCanvas from "react-signature-canvas"

//css
import "./newPatient.css"

//components
import Navbar from "../../../components/Navbar/Navbar"
import TermsOfServiceAndPrivacyPolicy from "../../../components/TermsOfServiceAndPrivacyPolicy/TermsOfServiceAndPrivacyPolicy"

function NewPatientForm3({
  patient,
  setPatient,
  medicalHistory,
  setMedicalHistory,
  sickness,
  setSickness,
  agreement,
  setAgreement,
  navigation
}) {
  const [inactive, setInactive] = useState(false)
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [sigPad, setSigPad] = useState()

  //MODAL
  const [showTermsOfServiceAndPrivacy, setShowTermsOfServiceAndPrivacy] =
    useState(false)
  const handleTermsOfServiceAndPrivacyClose = () =>
    setShowTermsOfServiceAndPrivacy(false)
  const handleTermsOfServiceAndPrivacyShow = () =>
    setShowTermsOfServiceAndPrivacy(true)

  const { bleedingTime, bloodType, bloodPressure } = medicalHistory

  const options = [
    { label: "High Blood Pressure", value: "high blood pressure" },
    { label: "Low Blood Pressure", value: "low blood pressure" },
    { label: "Epilepsy / Convulsions", value: "epilepsy/convulsions" },
    { label: "AIDS or HIV infection", value: "AIDS or HIV infection" },
    {
      label: "Sexually Transmitted Disease",
      value: "sexually transmitted disease"
    },
    { label: "Stomach Troubles / Ulcers", value: "stomach troubles / ulcers" },
    { label: "Fainting Seizure", value: "fainting seizure" },
    { label: "Rapid Weight Loss", value: "rapid weight loss" },
    { label: "Radiation Therapy", value: "radiation therapy" },
    {
      label: "Joint Replacement / Implant",
      value: "joint replacement implant"
    },
    { label: "Heart Surgery", value: "heart surgery" },
    { label: "Heart Attack", value: "heart attack" },
    { label: "Thyroid Problem", value: "thyroid problem" },
    { label: "Heart Disease", value: "heart disease" },
    { label: "Heart Murmur", value: "heart murmur" },
    { label: "Hepatitis / Liver Disease", value: "hepatitis/liver disease" },
    { label: "Rheumatic Fever", value: "rheumatic fever" },
    { label: "Hay Fever / Allergies", value: "hay fever/allergies" },
    { label: "Respiratory Problems", value: "respiratory problems" },
    { label: "Hepatitis / Jaundice", value: "hepatitis/jaundice" },
    { label: "Tuberculosis", value: "tuberculosis" },
    { label: "Swollen Ankles", value: "swollen ankles" },
    { label: "Kidney Disease", value: "kidney disease" },
    { label: "Diabetes", value: "diabetes" },
    { label: "Chest Pain", value: "chest pain" },
    { label: "Stroke", value: "stroke" }
  ]

  const clear = () => {
    sigPad.clear()
  }

  const save = () => {
    console.log(sigPad.getTrimmedCanvas().toDataURL("image/png"))
    setAgreement(sigPad.getTrimmedCanvas().toDataURL("image/png"))
  }

  function proceed() {
    if (
      bleedingTime != "" &&
      bloodType != "" &&
      bloodPressure != "" &&
      agreement != ""
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
      <Navbar
        onCollapse={(inactive) => {
          setInactive(inactive)
        }}
        active={1} //Appointment navbar index
      />
      <div className={`container ${inactive ? "inactive" : "active"}`}>
        <div className="row">
          <div className="col-sm-6">
            <h1 className="page-title">Add Patient</h1>
          </div>
        </div>
        <div className="row page-content">
          <div className="form-card-cont">
            <div className="row">
              <h1 className="peronal-info-header">
                Medical History Information
              </h1>
            </div>
            <div className="row mt-4">
              <div className="col-sm-4">
                <span className="form-label">Bleeding Time</span>
                <br />
                <input
                  type="text"
                  className="form-input bleeding-time-input"
                  name="bleedingTime"
                  value={bleedingTime}
                  onChange={setMedicalHistory}
                />
              </div>
              <div className="col-sm-4">
                <span className="form-label">Blood Type</span>
                <br />
                <select
                  className="form-input blood-type-input"
                  name="bloodType"
                  value={bloodType}
                  onChange={setMedicalHistory}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="A+">A+</option>
                  <option value="O+">O+</option>
                  <option value="B+">B+</option>
                  <option value="AB+">AB+</option>
                  <option value="A-">A-</option>
                  <option value="O-">O-</option>
                  <option value="B-">B-</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
              <div className="col-sm-4">
                <span className="form-label">Blood Pressure</span>
                <br />
                <input
                  type="text"
                  className="form-input middle-name-input"
                  name="bloodPressure"
                  value={bloodPressure}
                  onChange={setMedicalHistory}
                />
              </div>
            </div>
            <div className="row mt-5">
              <div class="col">
                <span className="form-label">
                  Do you have any of the following?
                </span>
                <br />
                <MultiSelect
                  options={options}
                  value={sickness}
                  onChange={setSickness}
                  labelledBy="Select"
                />
              </div>
            </div>

            <div className="row">
              {agreement ? (
                <>
                  <img
                    src={agreement}
                    alt="signature"
                    className="signature-img"
                  />
                  <p className="signature-label">Signature</p>
                </>
              ) : (
                ""
              )}
            </div>

            <div className="row">
              <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                  <Modal.Title>SIGN</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <SignatureCanvas
                    ref={(ref) => {
                      setSigPad(ref)
                    }}
                    penColor="black"
                    canvasProps={{
                      width: 500,
                      height: 200,
                      className: "sigCanvas"
                    }}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button
                    variant="info"
                    className="clear-btn"
                    onClick={() => clear()}
                  >
                    Clear
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    onClick={() => save()}
                  >
                    Save
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>

            <div class="row mt-5">
              <div className="col-sm-1">
                <button className="sign-btn" onClick={handleShow}>
                  SIGN
                </button>
              </div>
              <div className="col">
                <span> I accept and agree to the Surigao Dental Center</span>
                <br />
                <span
                  className="terms-label"
                  onClick={handleTermsOfServiceAndPrivacyShow}
                >
                  {" "}
                  Terms of Service and Privacy Policy
                </span>
                <Modal
                  show={showTermsOfServiceAndPrivacy}
                  onHide={handleTermsOfServiceAndPrivacyClose}
                  size="xl"
                >
                  <Modal.Header closeButton>
                    <Modal.Title>
                      {" "}
                      Terms of Service and Privacy Policy{" "}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {" "}
                    <TermsOfServiceAndPrivacyPolicy />{" "}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="primary"
                      onClick={handleTermsOfServiceAndPrivacyClose}
                    >
                      I accept the terms of service and privacy policy
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
              <div></div>
            </div>
            <div className="row navigation-cont">{proceed()}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewPatientForm3
