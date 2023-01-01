import axios from "../axios";

const handleLoginApi = (email, password) => {
    return axios.post('/api/handlelogin', {email, password});
}

const handleSignUpApi = (email, password, userName) => {
    return axios.post('/api/handlesignup', {email, password, userName})
}

const createPost = (userId, title, content, categoryId) => {
    return axios.post('api/createpost', {userId, title, content, categoryId})
}

const updatePost = (postId, title, content, categoryId) => {
    return axios.put('/api/updatepost', {postId, title, content, categoryId})
}

const deletePost = (postId) => {
    return axios.delete('api/deletepost?id=' + postId)
}

export {
    handleLoginApi,
    handleSignUpApi,
    createPost,
    updatePost, 
    deletePost
}