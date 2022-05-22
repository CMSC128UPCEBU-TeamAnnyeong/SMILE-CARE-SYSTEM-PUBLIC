import { getAPICall, postAPICall, putAPICall, deleteAPICall } from './axiosMethodCalls';

/***************************
 * QUEUE
 ***************************/

//POST
 export const getQueue = async () => {
    try {
        const response = await getAPICall(process.env.REACT_APP_LINK + 'queues');
        return ({data:response});   
    } catch (error) {
        return ({error: error});
    }
}
