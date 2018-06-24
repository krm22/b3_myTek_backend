var bcrypt = require('bcrypt');
var jwtUtils = require('../utils/jwt.utils')
var models = require('../models');
var asyncLib = require('async')

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    module.exports = {
        createUserGroup: (req, res) => {
            var headerAuth = req.headers['authorization'];
            var id_user = jwtUtils.getUserId(headerAuth);

            //object i want to create
            var id_group = req.body.id_group;
            var id_role = req.body.id_role;
            var label_group = req.body.label_group;
            var avatar_group = req.avatar_link_group;
            var creation_date_group = req.body.creation_date_group
            var modification_date_group = req.body.modification_date_group;
            var public_group = req.body.public_group;
            var label_role = req.body.label_role;

            if (id_user < 0) {
                return res.status(400).json({
                    error: 'wrong token'
                })
            }
            models.User.findAll({
                where: {
                    id_user: id_user
                },
                include: [{
                    model: models.User_Group,
                    as: 'users_group',
                    include: [{
                        model: models.Group,
                        as: 'group',
                    }, {
                        model: models.Role,
                        as: 'role'
                    }],
                }]
            }).then((userGroup) => {
                if (!userGroup[0].users_group[0] || userGroup[0].users_group[0].group.label_group != label_group) {
                    let promise1 = models.Group.create({
                            label_group: label_group,
                            avatar_link_group: avatar_group,
                            creation_date_group: creation_date_group,
                            modification_date_group: modification_date_group,
                            public_group: public_group,
                        })
                        let promise2 = models.Role.create({
                            label_role: label_role
                        })

                        let values = [ promise1, promise2 ]

                        Promise.all(values)
                        .then((values)=>{
                            let merge = [].concat.apply([],values);
                            console.log(merge)
                            let groupId = merge[0].dataValues.id_group;
                            let roleId = merge[1].dataValues.id_role;

                      let promise3 = models.User_Group.create({
                                id_group: groupId,
                                id_role: roleId,
                                id_user: id_user
                            })
                        let values2 = [ promise1, promise2, promise3 ]     

                        Promise.all(values2)
                        .then((values2)=>{
                            return res.status(201).json({
                                values2
                             })
                         })
                        }).catch((err) => {
                            return res.status(400).json({
                                'error': 'group already exits'
                            })
                        })
                } else {
                    return res.status(400).json({
                        'error': 'user already exits'
                    })
                }
            });
        },
        getUserGroups: (req, res) => {
            var headerAuth = req.headers['authorization'];
            var id_user = jwtUtils.getUserId(headerAuth);
            if (id_user < 0) {
                return res.status(400).json({
                    error: 'wrong token'
                })
            }
            models.User.findAll({
                where: {
                    id_user: id_user
                },
                include: [{
                    model: models.User_Group,
                    as: 'users_group',
                    include: [{
                        model: models.Group,
                        as: 'group',
                    }, {
                        model: models.Role,
                        as: 'role'
                    }],

                }]
            }).then((userGroupsFound) => {
                return res.status(201).json({
                    userGroupsFound
                })
            })
        },
        updateUserGroup:(req, res )=>{
            var headerAuth = req.headers['authorization'];
            var id_user = jwtUtils.getUserId(headerAuth);
            if (id_user < 0) {
                return res.status(400).json({
                    error: 'wrong token'
                })
            }

        },
       

    }