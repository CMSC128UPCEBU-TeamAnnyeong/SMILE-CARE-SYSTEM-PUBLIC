import { getAPICall, postAPICall, putAPICall, deleteAPICall } from './axiosMethodCalls';

/******************************
 * CATEGORIES & SERVICES
 *****************************/

//GET
export const getCategories = async () => {
    try {
        const response = await getAPICall(process.env.REACT_APP_LINK + 'categories');
        return ({data:response});   
    } catch (error) {
        return ({error: error});
    }
}

export const getServices = async (category) => {
    try {
        const response = await getAPICall(process.env.REACT_APP_LINK + 'services/' + category);
        return ({data:response});   
    } catch (error) {
        return ({error: error});
    }
}

export const getAllServices = async (category) => {
    try {
        const response = await getAPICall(process.env.REACT_APP_LINK + 'services');
        return ({data:response});   
    } catch (error) {
        return ({error: error});
    }
}
