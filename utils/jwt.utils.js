var jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = 'eyJhbGciOiJIUzTJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ'

module.exports = {
    generateTokenForUser: (userData) =>{
        return jwt.sign({
            id_user : userData.id_user
        },
        JWT_SIGN_SECRET,
        {
            expiresIn: '4h'
        })
    },
    parseAuthorization:(authorization) => {
        return ( authorization != null ) ? authorization.replace('Bearer ', '') : null;
    },
    getUserId:(authorization) => {
        var id_user = -1;
        var token = module.exports.parseAuthorization(authorization);
        if(token != null) {
          try {
            var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
            if(jwtToken != null)
             id_user = jwtToken.id_user;
          } catch(err) { }
        }
        return id_user;
    }
    
}