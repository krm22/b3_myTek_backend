var jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = 'eyJhbGciOiJIUzTJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ'

module.exports = {
    generateTokenForUser: (userData) =>{
        return jwt.sign({
            id_people: userData.id,
            isAdmin: userData.isAdmin
        },
        JWT_SIGN_SECRET,
        {
            expiresIn: '1h'
        })
    }
}