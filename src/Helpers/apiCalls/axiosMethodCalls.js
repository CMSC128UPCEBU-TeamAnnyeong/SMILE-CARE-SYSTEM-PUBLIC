import axios from 'axios';

let config = {
    withCredentials: true,
    headers: {
      "Content-Type":
        "multipart/form-data; charset=utf-8; boundary=ThisIsMyBoundary"
    }
  }

// API Axios Get Call.
export const getAPICall = (url) => {
    return axios.get(url,{
        withCredentials: true,
    });
}
// API Axios Post Call.
export const postAPICall = (url, data) => {
    return axios.post(url, data, {
        withCredentials: true,
    });
}

// API Axios Post Call with multimedia
export const postAPICallMulti = (url, data) => {
    return axios.post(url, data, config)
}

// API Axios Put Call.
export const putAPICall = (url, data) => {
    return axios.put(url, data,{
        withCredentials: true,
    });
}
// API Axios Delete Call.
export const deleteAPICall = (url) => {
    return axios.delete(url);
}