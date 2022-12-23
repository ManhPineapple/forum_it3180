import homeService from '../services/homeService'

let getHomePage = (req, res) => {
    return res.render('homepage.ejs');
}

let readPost = async (req, res) => {
    let listOfPost = await homeService.readPost();

    return res.json({
        listOfPost: listOfPost
    })
}

module.exports = {
    getHomePage: getHomePage,
    readPost: readPost
}
