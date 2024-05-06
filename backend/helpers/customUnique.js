const Conexion = require('../database/ConexionUsuario.js');

// Para que el email sea UNIQUE
const emailExiste = (email = '') => {
    return new Promise((resolve, reject) => {
        const conx = new Conexion();
        conx.emailExisteValidator(email)
            .then(msg => {
                console.log('Existe');
                resolve(true);
            })
            .catch(err => {
                console.log('No existe');
                reject(new Error('Email existe'));
            });
    });
}

module.exports = {
    emailExiste
}