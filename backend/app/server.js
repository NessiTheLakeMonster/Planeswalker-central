const express = require('express');
// const body_parser = require('body-parser');
const cors = require('cors');

//https://sequelize.org/docs/v6/getting-started/

class Server {

    constructor() {
        this.app = express();
        this.authPath = '/api/auth';
        this.usuariosPath = '/api/usuarios';
        this.cartasPath = '/api/cartas';
        this.tiendaPath = '/api/tienda';
        this.mazosPath = '/api/mazos';
        this.planificadorPath = '/api/planificador';

        //Middlewares
        this.middlewares();

        this.routes();

    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.authPath, require('../routes/authRoutes'));
        this.app.use(this.usuariosPath, require('../routes/usuarioRoutes'));
        this.app.use(this.cartasPath, require('../routes/cartasRoutes'));
        this.app.use(this.tiendaPath, require('../routes/tiendaRoutes'));
        this.app.use(this.mazosPath, require('../routes/mazosRoutes'));
        this.app.use(this.planificadorPath, require('../routes/planificadorRoutes'));
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Servidor escuchando en: ${process.env.PORT}`);
        })
    }
}

module.exports = Server;