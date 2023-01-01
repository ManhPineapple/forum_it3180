import db from '../models/index'

let readPost = async () => {
    let listOfPost = await db.Post.findAll({
        where: {status: 'accepted'},
        limit: 10,
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'userId', 'title', 'content'],
        raw: false, 
        include: [{
            model: db.User,
            attributes: ['userName'],
        }, {
            model: db.Category,
            attributes: ['name'],
        }]
    });
    return listOfPost;
}

module.exports = {
    readPost: readPost
}