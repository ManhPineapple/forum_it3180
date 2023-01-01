import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import adminController from "../controllers/adminController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);

    router.post('/api/handlelogin', userController.handleLogin);
    router.post('/api/handlesignup', userController.handleSignup);
    router.put('/api/updateInfo', userController.updateInfo);

    router.get('/api/post', homeController.readPost);
    router.get('/api/mypost', userController.myPost);
    router.post('/api/createpost', userController.createPost);
    router.put('/api/updatepost', userController.updatePost);
    router.delete('/api/deletePost', userController.deletePost);

    router.all('/api/inspectpost', adminController.inspectPost);
    // router.get('/api/getalluser', adminController.getAllUsers);
    // router.delete('api/deleleuser', adminController.deleteUser);


    return app.use("/", router);
}

module.exports = initWebRoutes;