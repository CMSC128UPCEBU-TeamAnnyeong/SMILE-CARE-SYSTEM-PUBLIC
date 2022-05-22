import {
    getAPICall,
    postAPICall,
    putAPICall,
    deleteAPICall
  } from "./axiosMethodCalls"
  
  /******************************
   * APPOINTMENT
   *****************************/
  
  //GET
  export const getAllTreatments = async (patient) => {
    try {
      const response = await getAPICall(
        process.env.REACT_APP_LINK + "treatments/" + patient + "/patient"
      )
      return { data: response }
    } catch (error) {
      return { error: error }
    }
  }

    //GET
    export const getTreatment = async (id) => {
      console.log(id)
      try {
        const response = await getAPICall(
          process.env.REACT_APP_LINK + "treatments/" + id
        )
        return { data: response }
      } catch (error) {
        return { error: error }
      }
    }
  
  export const createTreatment = async (
    id,
    treatmentDate,
    upperLeftTopDropdown,
    upperRightTopDropdown,
    bottomLeftTopDropdown,
    bottomRightTopDropdown,
    upperLeftBottomDropdown,
    upperRightBottomDropdown,
    bottomLeftBottomDropdown,
    bottomRightBottomDropdown,
    periodontal,
    occlusions,
    tmd,
    appliances,
    multimedia
  ) => {
    try {
      const response = await postAPICall(
        process.env.REACT_APP_LINK + "treatments",
        {
          patient: id,
          treatmentDate: treatmentDate,
          upper_left_top_teeths: upperLeftTopDropdown,
          upper_right_top_teeths: upperRightTopDropdown,
          bottom_left_top_teeths: bottomLeftTopDropdown,
          bottom_right_top_teeths: bottomRightTopDropdown,
          upper_left_bottom_teeths: upperLeftBottomDropdown,
          upper_right_bottom_teeths: upperRightBottomDropdown,
          bottom_left_bottom_teeths: bottomLeftBottomDropdown,
          bottom_right_bottom_teeths: bottomRightBottomDropdown,
          periodontal: periodontal.periodontalDt,
          occlusions: occlusions.occlusionsDt,
          tmd: tmd.tmdDt,
          appliances: appliances.appliancesDt,
          multimedia: multimedia,
        }
      )
      return { data: response.data }
    } catch (error) {
      return { error: error }
    }
  }