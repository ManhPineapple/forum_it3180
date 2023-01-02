import axios from '../axios';

const inspectPost = (postId, action) => {
    // console.log(`/api/inspectpost?id=${postId}&action=${action}`)
    return axios.get(`/api/inspectpost?id=${postId}&action=${action}`)
}

export {
    inspectPost
};