const express = require('express');
// const body_parser = require('body-parser');
const cors = require('cors');

//https://sequelize.org/docs/v6/getting-started/

class Server {

    constructor() {
        this.app = express();
        this.authPath = '/api/auth';
        this.usuariosPath = '/api/usuarios';
        this.tareasPath = '/api/tareas';

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
        this.app.use(this.usuariosPath, require('../routes/userRoutes'));
        this.app.use(this.tareasPath, require('../routes/tareasRoutes'));
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Servidor escuchando en: ${process.env.PORT}`);
        })
    }
}

module.exports = Server;