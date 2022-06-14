import React, { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
//css
import "./ProfileUpload.css"

//images
import AddFile from "../../../../Assets/Images/AddTreatment/add-file 1.png"
import filePng from "../../../../Assets/Images/Multimedia/img_icon.png"
import filePdf from "../../../../Assets/Images/Multimedia/pdf_icon.png"
import fileVid from "../../../../Assets/Images/Multimedia/vid_icon.png"
import fileDefault from "../../../../Assets/Images/Multimedia/default_icon.png"

const ImageConfig = {
  default: fileDefault,
  pdf: filePdf,
  png: filePng,
  jpeg: filePng,
  mp4: fileVid
}

const ProfileUpload = ({ profilePicture, setProfilePicture }) => {
  const wrapperRef = useRef(null)
  const onDragEnter = () => wrapperRef.current.classList.add("dragover")
  const onDragLeave = () => wrapperRef.current.classList.remove("dragover")
  const onDrop = () => wrapperRef.current.classList.remove("dragover")

  const onFileDrop = (e) => {
    const newFile = e.target.files[0]
    if (newFile) {
      const updatedList = [...profilePicture, newFile]
      setProfilePicture(updatedList)
    }
  }

  const fileRemove = (file) => {
    const updatedList = [...profilePicture]
    updatedList.splice(profilePicture.indexOf(file), 1)
    setProfilePicture(updatedList)
  }

  return (
    <div class="col">
      <div className="profile-picture-cont">
        <center>
          <div className="add-file">
            <img className="add-file-img" src={AddFile} />
          </div>

          <div
            ref={wrapperRef}
            className="drop-file-input"
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            <input
              id="profile-picture"
              type="file"
              class="custom-file-input"
              onChange={onFileDrop}
            ></input>
          </div>
          <div class="text">
            <label for="profile-picture">or drag a file here</label>
          </div>

          {profilePicture.length > 0 ? (
            <div className="drop-file-preview">
              {profilePicture.map((item, index) => (
                <div
                  key={index}
                  className="drop-file-preview__item"
                  style={{ marginLeft: 100 }}
                >
                  <img
                    src={
                      ImageConfig[item.type.split("/")[1]] ||
                      ImageConfig["default"]
                    }
                    alt=""
                  />
                  <div className="drop-file-preview__item__info">
                    {/* <p>{item.name}</p>
                                  <p>{item.size}B</p> */}
                  </div>
                  <span
                    className="drop-file-preview__item__del"
                    onClick={() => fileRemove(item)}
                  >
                    x
                  </span>
                </div>
              ))}
            </div>
          ) : null}
        </center>
      </div>
    </div>
  )
}
export default ProfileUpload
