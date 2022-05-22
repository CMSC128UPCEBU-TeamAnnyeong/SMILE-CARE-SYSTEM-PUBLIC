import { getAPICall, postAPICall, putAPICall, deleteAPICall } from './axiosMethodCalls';

/******************************
 * APPOINTMENT
 *****************************/

//POST
export const createAppointment = async (id, catergory, appointment, services, notes) => {
    try {
        const response = await postAPICall(process.env.REACT_APP_LINK + 'appointments', {
            patient: id,
            category: catergory,
            appointment_date_time: appointment.appointmentDateTime,
            services: services,
            remarks: notes,
        });
        return ({data:response});   
    } catch (error) {
        return ({error: error});
    }
}

export const updateAppointment = async (id, appointment) => {
    try {
        const response = await putAPICall(process.env.REACT_APP_LINK + 'appointments/' + id, {
            appointment_date_time: appointment.appointmentDateTime,
            services: appointment.services,
            remarks: appointment.remarks,
        });
        return ({data:response});   
    } catch (error) {
        return ({error: error});
    }
}

export const updateStatusAppointment = async (id, status) => {
    try {
        const response = await putAPICall(process.env.REACT_APP_LINK + 'appointments/' + id, {
            status: status,
        });
        return ({data:response});   
    } catch (error) {
        return ({error: error});
    }
}

export const getAppointments = async (name, date) => {
    try {
        const response = await getAPICall(process.env.REACT_APP_LINK + 'appointments?searchText=' + name + "&date=" + date);
        return ({data:response});   
    } catch (error) {
        return ({error: error});
    }
}

//for search
export const getAppointment = async (id) => {
    try {
        const response = await getAPICall(process.env.REACT_APP_LINK + 'appointments/' + id);
        return ({data:response});   
    } catch (error) {
        return ({error: error});
    }
}
