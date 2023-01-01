import db from '../models/index'
import bcrypt from 'bcryptjs'

const salt = bcrypt.genSaltSync(7)

let handleLogin = async (email, password) => {
    let userdata = {}

    let dbUser = await db.User.findOne({
        where: {email: email},
        attributes: ['id','email', 'password', 'userName', 'roleId'],
    })

    if (dbUser) {
        let check = bcrypt.compareSync(password, dbUser.password);

        if (check){
            userdata.userId = dbUser.id;
            userdata.email = dbUser.email;
            userdata.userName = dbUser.userName;
            userdata.roleId = dbUser.roleId;
            return userdata
        } else return null
    }
}

let createNewUser = async (newuser) => {
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
        attributes: ['id', 'title', 'content', 'status'],
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

let updatePost = async(newPost) => {
    await db.Post.update(
        {
            title: newPost.title,
            content: newPost.content,
            categoryId: newPost.categoryId,
            status: 'pending'
        },
        {
            where: {id: newPost.postId}
        }
    )
}

let deletePost = async(id) => {
    await db.Post.destroy({
        where: {id: id}
        }
    )
}

module.exports = {
    handleLogin: handleLogin,
    createNewUser: createNewUser, 
    createPost: createPost,
    myPost: myPost,
    updateInfo: updateInfo,
    deletePost: deletePost,
    updatePost: updatePost
}