import { getAPICall, postAPICall, putAPICall, deleteAPICall } from './axiosMethodCalls';

/***************************
 * SIGN IN AND SIGN OUT
 ***************************/

//POST
 export const loginUser = async (email,password) => {
    try {
        const response = await postAPICall(process.env.REACT_APP_LINK + 'auth/signin', {
            email: email,
            password: password,
        });
        return ({data:response});   
    } catch (error) {
        return ({error: error});
    }
}

//POST
export const logoutUser = async () => {
    try {
        const response = await postAPICall(process.env.REACT_APP_LINK + 'auth/signout');
    } catch (error) {
        return ({error: error});
    }
}
