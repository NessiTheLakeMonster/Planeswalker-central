const bcrypt = require('bcrypt');
const { fakerES } = require('@faker-js/faker');

const generarUsuarios = async (cantidadUsuarios) => {
    let usuariosGenerados = []

    for (let i = 1; i <= cantidadUsuarios; i++) {
        // genera numero aleatorio de 0 a 1000 para los puntos
        let puntos = Math.floor(Math.random() * 1000)
        
        let u =
        {
            nombre: fakerES.person.firstName(),
            apellidos: fakerES.person.lastName(),
            email: fakerES.internet.email(),
            nick: fakerES.internet.userName(),
            password: await bcrypt.hash('1234', 10),
            puntos: puntos,
            foto_perfil: 'foto_perfil_defecto',
            activo: 0,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        usuariosGenerados.push(u)
    }
    let usuarioAdmin = {
        nombre: 'admin',
        apellidos: 'admin admin',
        email: 'admin@gmail.com',
        nick: 'admin',
        password: await bcrypt.hash('admin', 10),
        puntos: 1000,
        foto_perfil: 'foto_perfil_defecto',
        activo: 0,
        createdAt: new Date(),
        updatedAt: new Date()
    }
    usuariosGenerados.push(usuarioAdmin)
    return Promise.all(usuariosGenerados);

}
module.exports = {
    generarUsuarios
}
