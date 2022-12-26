import axios from "../axios";

const handleLoginApi = (email, password) => {
    return axios.post('/api/handlelogin', {email, password});
}

const handleSignUpApi = (email, password, userName) => {
    return axios.post('/api/handlesignup', {email, password, userName})
}

export {
    handleLoginApi,
    handleSignUpApi
}