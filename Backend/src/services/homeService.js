import db from '../models/index'

let readPost = async () => {
    let listOfPost = await db.Post.findAll({
        where: {status: 'accepted'},
        limit: 10,
        order: [['createdAt', 'DESC']],
        attributes: ['userId', 'title', 'content'],
        raw: false, 
        include: {
            model: db.Category,
            attributes: ['name'],
        }
    });
    return listOfPost;
}

module.exports = {
    readPost: readPost
}