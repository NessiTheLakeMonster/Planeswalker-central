const jwt = require('jsonwebtoken')


const generarJWT = (uid = '', roles = [], nombre='') => {
    return jwt.sign({uid, roles, nombre}, process.env.SECRETORPRIVATEKEY, {
        expiresIn: '4h' 
    });
}

module.exports = {
    generarJWT
}