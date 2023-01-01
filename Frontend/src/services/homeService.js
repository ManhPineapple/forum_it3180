import axios from "../axios";

const readPost = (userId) => {
    if (userId === undefined) return axios.get('/api/post');
    else return axios.get('/api/mypost?id=' + userId)
}

export {
    readPost
}