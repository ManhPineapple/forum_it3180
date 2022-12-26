import db from '../models/index'
import bcrypt from 'bcryptjs'

const salt = bcrypt.genSaltSync(7)

let handleLogin = async (email, password) => {
    let userdata = {}

    let dbUser = await db.User.findOne({
        where: {email: email},
        attributes: ['email', 'password', 'userName'],
    })

    if (dbUser) {
        let check = bcrypt.compareSync(password, dbUser.password);

        if (check){
            userdata.email = dbUser.email;
            userdata.userName = dbUser.userName;
            return userdata
        } else return null
    }
}

let creatNewUser = async (newuser) => {
    let dbUser = await db.User.findOne({
        where: {email: newuser.email},
        attributes: ['email', 'password'],
    })
    if (!dbUser) {
        let hashPassword = bcrypt.hashSync(newuser.password, salt);
        await db.User.create({
            email: newuser.email,
            password: hashPassword,
            userName: newuser.userName,
            avatar: newuser.avatar,
            roleId: newuser.roleId
        })
        return true
    } else return false
}

let createPost = async(newPost) => {
    await db.Post.create({
        userId: newPost.userId,
        title: newPost.title,
        content: newPost.content,
        categoryId: newPost.categoryId,
        status: 'pending'
    })
}

let myPost = async(userId) => {
    let listOfPost = await db.Post.findAll({
        where: {userId: userId},
        attributes: ['userId', 'title', 'content', 'status'],
        raw: false, 
        include: {
            model: db.Category,
            attributes: ['name'],
        }
    })
    return listOfPost;
}

let updateInfo = async(newInfo) => {
    await db.User.update(
        {
            userName: newInfo.userName,
            image: newInfo.image
        },
        {
            where: {id: newInfo.userId},
        }
    )
}

module.exports = {
    handleLogin: handleLogin,
    creatNewUser: creatNewUser, 
    createPost: createPost,
    myPost: myPost,
    updateInfo: updateInfo
}