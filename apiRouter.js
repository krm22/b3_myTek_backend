//Imports 
var express = require('express');
var usersCtrl = require('./routes/usersCtrl');
var moviesCtrl = require('./routes/moviesCtrl');
var groupCtrl = require('./routes/groupCtrl');

exports.router = (function(){

    var apiRouter = express.Router();

    //User functionality routes
    apiRouter.route('/users/register').post(usersCtrl.register);
    apiRouter.route('/users/login').post(usersCtrl.login);
    apiRouter.route('/users/userprofile').get(usersCtrl.getUserProfile)
    apiRouter.route('/users/update/userprofile').put(usersCtrl.updateUserProfile)
    apiRouter.route('/users/view/Group/MediaTek/Movies').get(usersCtrl.userGetGroupsMediateks)

    //Movie information api routes
    apiRouter.route('/users/usersmovielist').get(moviesCtrl.getUsersMoviesList)
    apiRouter.route('/users/usermovielist').get(moviesCtrl.getUserMoviesList)
    

    //Group information routes
    apiRouter.route('/users/create/group').post(groupCtrl.createUserGroup)
    apiRouter.route('/users/groups').get(groupCtrl.getUserGroups)
    //apiRouter.route('/users/update/group').put(groupCtrl.updateUserGroup)

    return apiRouter;

})();