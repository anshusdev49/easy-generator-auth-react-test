import axios from 'axios';

const URL = "http://localhost:3000";

export const loginAPI = async (data: any) => {
    try {
        const resp = await axios.post(`${URL}/users/login`, data)
        console.log("response",resp.data.token)
        
        return resp.data.token
    } catch(error) {
        console.log("Error while logging",error)
        return error
    }
};

export const signupAPI = async (data: any) => {
    try {
        const resp = await axios.post(`${URL}/users/signup`, data);
        console.log("============>",resp.data.token)
        return resp?.data?.token
    } catch (error) {
        console.log("Error while user register",error);
        return error
    }
}
