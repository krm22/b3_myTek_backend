var bcrypt = require('bcrypt');
var jwtUtils = require('../utils/jwt.utils')
var models = require('../models');
var asyncLib = require('async')

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


module.exports = {
    userAddMovie: (req, res) => {
        var headerAuth = req.headers['authorization'];
        var id_user = jwtUtils.getUserId(headerAuth);


        var title_movie = req.body.title_movie 
        var release_date_movie = req.body.release_date_movie
        var creation_date_movie = req.body.creation_date_movie
        var poster_movie = req.body.poster_movie
        var description_movie = req.body.description_movie
        var original_title_movie = req.body.original_title_movie
        var id_genre = req.body.id_genre

        models.User.findOne({
            where: {
                id_user: id_user
            },
                include: [{
                    model: models.Publish,
                    as: 'publish',
                    include: [{
                        as: 'movie',
                        model: models.Movie,
                    }]
                }]
            })
            .then(users => {
                res.status(201).json(users)
            })
            .catch(console.error)
    },
    getUserMoviesList:  (req, res)=>{
        var headerAuth = req.headers['authorization'];
        var id_user = jwtUtils.getUserId(headerAuth);
    
        if (id_user < 0)
            return res.status(400).json({
                'error': 'wrong token'
            });
            
            models.User.findAll({
                where: {
                    id_user: id_user
                },
                include:[{
                    model: models.Publish,
                    as: 'publish',
                    include:[ {
                        model: models.Movie,
                        as: 'movie'
                    }
                   ]
                }],
            }).then(
                (userGroupMediaProfile)=>{
                    return res.status(201).json({userGroupMediaProfile})
                }
            )
    },
    userCreateMovieList: (req, res) => {
        var headerAuth = req.headers['authorization'];
        var id_user = jwtUtils.getUserId(headerAuth);

        var id_movie = req.body.id_movie;
        var id_mediatek = req.body.id_mediatek;
        var title_movie = req.body.title_movie;
        var release_date_movie = req.body.release_date_movie;
        var creation_date_movie = req.body.creation_date_movie;
        var modification_date_group = req.body.modification_date_group;
        var label_mediatek = req.body.label_mediatek;
        var public_mediatek = req.body.public_mediatek;
        var poster_movie = req.body.poster_movie;

        models.User.findOne({
            where: {
                id_user: id_user
            },
            include: [{
                model: models.Publish,
                as: 'publish',
                include: [{
                    model: models.Movie,
                    as: 'movie',
                    model: models.Mediatek,
                    as: 'mediatek'
                }]
            }]
        })
        .then((userGroup) => {
          let publishTableContents = userGroup.publish;
            if (publishTableContents === null || userGroup.publish['title_movie'] != title_movie) {
                    let promise1 = models.Mediatek.create({
                        label_mediatek: label_mediatek,
                        public_mediatek: public_mediatek
                    })
                    let promise2 = models.Movie.create({
                            title_movie: title_movie,
                            release_date_movie: release_date_movie,
                            creation_date_movie: creation_date_movie,
                            modification_date_group: modification_date_group,
                            poster_movie: poster_movie,
                            id_genre: null
                    })

                    let values = [ promise1, promise2 ]
                    
                    Promise.all(values)
                    .then((values) => {
                        let merge = [].concat.apply([],values);
                        let movieId = merge[1].dataValues.id_movie;
                        let mediatekId = merge[0].dataValues.id_mediatek;

                     let promise3 = models.Publish.create({
                                id_movie: movieId,
                                id_mediatek: mediatekId,
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
                            console.log(err)
                            return res.status(400).json({
                                'error': 'group already exits'
                            })
                        })
                } else {
                    return res.status(400).json({
                        'error': 'user already exits'
                    })
                }
            }
        )}
    }















 

                                
        




