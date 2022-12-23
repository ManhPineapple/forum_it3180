import db from '../models/index';

let readPending = async() => {
    let pendingPost = await db.Post.findAll({
        where: {status: 'pending'},
        attributes: ['userId', 'title', 'content'],
        raw: false,
        include: {
            model: db.Category,
            attributes: ['name'],
        }
    })
    return pendingPost
}

let acceptPost = async(id) => {
    await db.Post.update(
        {
            status: 'accepted'
        },
        {
            where: {id: id},
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
    readPending: readPending,
    acceptPost: acceptPost,
    deletePost: deletePost
}