//Imports 
var bcrypt = require('bcrypt');
var jwtUtils = require('../utils/jwt.utils')
var models = require('../models');
var asyncLib = require('async')

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//Routes
module.exports = {
    register: (req, res) => {
        //params front to back mapping
        var id_user = req.body.id_user
        var firstname = req.body.firstname_user
        var surname = req.body.surname_user
        var password = req.body.password_user
        var email = req.body.email_user
      //  var link_avatar = req.body.avatar_link_user

        if (email == null || password == null) {
            return res.status(400).json({
                'error': 'missing parameters'
            });
        }

        if (!EMAIL_REGEX.test(email)) {
            return res.status(400).json({
                'error': 'email is not valid'
            });
        }
        // Todo:  verify psuedo length, mail regex, password etc 
        models.User.findOne({
                attributes: ['email_user'],
                where: {
                    email_user: email,
                },
            })
            .then((userFound) => {
                if (!userFound) {
                    bcrypt.hash(password, 5, (error, bcryptedPassword) => {
                        let newUser = models.User.create({
                                //backend to front-end object mapping
                                id_user: id_user,
                                firstname_user: firstname,
                                surname_user: surname,
                                password_user: bcryptedPassword,
                                email_user: email
                            })
                            .then((newUser) => {
                                return res.status(201).json({
                                    'id_user': newUser.id_user,
                                })
                            })
                            .catch((err) => {
                                return res.status(500).json({
                                    'error': 'cannot add user'
                                })
                            });
                    });
                } else {
                    return res.status(400).json({
                        'error': 'user already exits'
                    })
                }
            })
            .catch((err) => {
                return res.status(500).json({
                    'error': 'unable to verify user'
                });
            })
    },
    login: (req, res) => {
        //Params
        var email = req.body.email_user;
        var password = req.body.password_user;

        if (email == null || password == null) {
            return res.status(400).json({
                'error': 'missing parameters'
            });
        }
        if (!EMAIL_REGEX.test(email)) {
            return res.status(400).json({
                'error': 'email is not valid'
            });
        }
        models.User.findOne({
                where: {
                    email_user: email,
                }
            })
            .then((userFound) => {
                if (userFound) {
                    bcrypt.compare(password, userFound.password_user, (err, resBcrypt) => {
                        if (resBcrypt) {
                            return res.status(200).json({
                                'id_user': userFound.id_user,
                                'token': jwtUtils.generateTokenForUser(userFound),
                            })
                        } else {
                            return res.status(403).json({
                                'error': 'invlaid password'
                            })
                        }
                    });
                } else {
                    return res.status(400).json({
                        'error': 'user does not exist in database'
                    })
                }
            })
            .catch((err) => {
                return res.status(500).json({
                    'error': 'unable to verify user'
                });
            })
    },
    getUserProfile: (req, res) => {
        var headerAuth = req.headers['authorization'];
        var id_user = jwtUtils.getUserId(headerAuth);

        if (id_user < 0)
            return res.status(400).json({
                'error': 'wrong token'
            });
        models.User.findOne({
            attributes: ['id_user', 'email_user', 'firstname_user', 'surname_user', 'password_user'],
            where: 
            { id_user: id_user },
        }).then((user) => {
            if (user) {
                res.status(201).json(user);
            } else {
                res.status(404).json({
                    'error': 'user not found'
                });
            }
        }).catch(() => {
            res.status(500).json({
                'error': 'cannot fetch user'
            });
        })
    },
    updateUserProfile: (req, res) => {
        // Getting auth header
        var headerAuth = req.headers['authorization'];
        var id_user = jwtUtils.getUserId(headerAuth);

        // Params
        var firstname = req.body.firstname_user;
        var email = req.body.email_user;
        var password = req.body.password_user;

        asyncLib.waterfall([
            (done) => {
                models.User.findOne({
                        attributes: ['id_user', 'email_user', 'firstname_user', 'password_user'],
                        where: {
                            id_user: id_user
                        }
                    }).then((userFound) => {
                        done(null, userFound);
                    })
                    .catch((err) => {
                        return res.status(500).json({
                            'error': 'unable to verify user'
                        });
                    });
            },
            (userFound, done) => {
                if (userFound) {
                    userFound.update({
                        email_user: (email ? email : userFound.email_user),
                        firstname_user: (firstname ? firstname : userFound.firstname_user),
                        password_user: (password ? password : userFound.password_user),
                    }).then(() => {
                        done(userFound);
                    }).catch((err) => {
                        res.status(500).json({
                            'error': 'cannot update user'
                        });
                    });
                } else {
                    res.status(404).json({
                        'error': 'user not found'
                    });
                }
            },
        ], (userFound) => {
            if (userFound) {
                return res.status(201).json(userFound);
            } else {
                return res.status(500).json({
                    'error': 'cannot update user profile'
                });
            }
        });
    },
    
}

