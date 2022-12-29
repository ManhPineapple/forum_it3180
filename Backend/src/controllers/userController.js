import userService from "../services/userService";

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.json({
            message: 'Missing input'
        })
    }
    let userdata = await userService.handleLogin(email, password);
    if (userdata) {    
        return res.status(200).json({
            userdata: userdata,
            message: 'success'
        })
    } else return res.json({
        message: 'Wrong email or password'
    })
}

let handleSignup = async (req, res) => {
    let newuser = req.body;
    if (newuser.email && newuser.password && newuser.userName) {
        if (await userService.createNewUser(newuser)) {
            return res.json({
                message: 'Success'
            })
        } else {
            return res.json({
                message: 'Email is already exist!'
            })
        }
    } else {
        return res.json({
            message: 'Missing required field'
        })
    }
}

let createPost = async (req, res) => {
    let newPost = req.body;
    await userService.createPost(newPost);
    return res.json({
        message: 'Post is wait for check!'
    })
}

let myPost = async (req, res) => {
    let userId = req.body.userId;
    let listOfPost = await userService.myPost(userId);
    return res.json({
        listOfPost: listOfPost
    })
}

let updateInfo = async(req, res) => {
    let newInfo = req.body;
    await userService.updateInfo(newInfo);

    return res.json({
        message: 'Update Completed!'
    })
}

module.exports = {
    handleLogin: handleLogin,
    handleSignup: handleSignup,
    createPost: createPost,
    myPost: myPost, 
    updateInfo: updateInfo
}