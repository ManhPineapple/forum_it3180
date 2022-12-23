import adminService from "../services/adminService";

let inspectPost = async(req, res) => {
    let id = req.query.id;
    let action = req.query.action;
    if (!id) {
        let listOfPending = await adminService.readPending();
        return res.json({
            listOfPending: listOfPending
        })
    } else {
        if (action == 'accept'){    
            await adminService.acceptPost(id);
            return res.json({
                message: 'Post ' + id + ' accepted!'
            })
        }
        if (action == 'delete') {
            await adminService.deletePost(id);
            return res.json({
                message: 'Post ' + id + ' removed!'
            })
        }
    }
}

module.exports = {
    inspectPost: inspectPost,
}