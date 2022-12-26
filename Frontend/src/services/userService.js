import axios from "../axios";

const handleLoginApi = (email, password) => {
    return axios.post('/api/handleLogin', {email, password});
}

export {
    handleLoginApi
}