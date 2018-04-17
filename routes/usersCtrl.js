//Imports 
var bcrypt = require('bcrypt');
var jwtUtils = require('../utils/jwt.utils')
var models = require('../models');

//Routes
module.exports = {
    register: (req, res) =>{

       //params front to back mapping
       
       var id = req.body.id_people
       var firstname = req.body.firstname_people;
       var surname = req.body.surname_people;
       var idnatpeople  = req.body.id_nationality_people;

       if (firstname == null || surname == null ){
           return res.status(400).json({
                'error': 'missing parameters'
           });
       }

      // Todo:  verify psuedo length, mail regex, password etc 

        models.People.findOne({
            attributes: ['surname_people'],
            where: { surname_people: surname }
        })
        .then((userFound)=>{
            if(!userFound) {

                bcrypt.hash(surname, 5, (err, bcryptedPassword)=>{
                    var newUser = models.People.create({
                        //backend to front-end object mapping
                        id_people: id,
                        firstname_people : firstname,
                        surname_people : bcryptedPassword,
                        id_nationality_people : idnatpeople,
                        isAdmin: 0 
                    })
                    .then((newUser)=>{
                        return res.status(201).json({
                            'id_people': newUser.id
                        })
                    })
                    .catch(()=>{
                        return res.status(500).json({ 'error': 'cannot add  user'})
                    });
                });
          } else {
              return res.status(400).json({'error': 'user already exits'})
          }
        })
        .catch((err)=>{
            return res.status(500).json({
                'error': 'unable to verify user'
            });
        })
    },
    login: (req, res)=>{
        
        //Params
       var  firstname = req.body.firstname_people;
       var  surname = req.body.surname_people;

       if (firstname == null || surname == null ){
        return res.status(400).json({
             'error': 'missing parameters'
        });
       }

     // Todo:  verify psuedo length, mail regex, password etc 

     models.People.findOne({
        where: {surname_people: surname}
     })
     .then((userFound)=>{
        if(userFound) {

            bcrypt.compare(surname, userFound.surname, (errBcrypt, resBcrypt)=>{
                if(resBcrypt){
                    return res.status(200).json({
                         'id_people': userFound.id,
                         'token': jwtUtils.generateTokenForUser(userFound)
                    })
                }else {
                    return res.status(403).json({'error': 'invlaid password'})
                }
            });
      } else {
          return res.status(400).json({'error': 'user does not exist in database'})
      }
    })
    .catch((err)=>{
        return res.status(500).json({
            'error': 'unable to verify user'
        });
    })
 },
  
}