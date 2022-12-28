import axios from "../axios";

const readPost = () => {
    return axios.get('/api/post');
}

export {
    readPost
}