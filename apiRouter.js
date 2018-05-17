//Imports 
var express = require('express');
var usersCtrl = require('./routes/usersCtrl');

exports.router = (function(){

    var apiRouter = express.Router();

    apiRouter.route('/users/register').post(usersCtrl.register);
    apiRouter.route('/users/login').post(usersCtrl.login);
    apiRouter.route('/users/userprofile').get(usersCtrl.getUserProfile)
    apiRouter.route('/users/update/userprofile').put(usersCtrl.updateUserProfile)
    apiRouter.route('/users/test').get(usersCtrl.getUsersMoviesList)
    

    return apiRouter;

})();