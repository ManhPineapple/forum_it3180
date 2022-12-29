import axios from "../axios";

const handleLoginApi = (email, password) => {
    return axios.post('/api/handlelogin', {email, password});
}

const handleSignUpApi = (email, password, userName) => {
    return axios.post('/api/handlesignup', {email, password, userName})
}

const createPost = (title, content, categoryId) => {
    return axios.post('api/createpost', {title, content, categoryId})
}

export {
    handleLoginApi,
    handleSignUpApi,
    createPost
}