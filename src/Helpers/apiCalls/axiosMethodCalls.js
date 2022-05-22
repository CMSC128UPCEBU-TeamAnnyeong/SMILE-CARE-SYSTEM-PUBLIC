import React from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

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