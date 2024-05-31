const jwt = require('jsonwebtoken');
const { response, request } = require('express');

const validarJWT = (req = request, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        req.uid = uid;
        console.log(uid);
        console.log(token);
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }
}

const validarAdmin = async (req = request, res = response, next) => {
    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    try {
        const { roles } = jwt.verify(token, process.env.secretOrPrivateKey)

        if (!roles.includes('admin')) {
            return res.status(401).json({
                msg: 'No tienes permisos para realizar esta acción'
            })
        } else {
            next();
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

const validarVendedor = async (req = request, res = response, next) => {
    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    try {
        const { roles } = jwt.verify(token, process.env.secretOrPrivateKey)

        for (let i = 0; i < roles.length; i++) {
            if (roles[i] === 'vendedor') {
                next();
                return;
            }
        }

        res.status(403).json({
            msg: 'El usuario no tiene el rol de vendedor'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

const validarComprador = async (req = request, res = response, next) => {
    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    try {
        const { roles } = jwt.verify(token, process.env.secretOrPrivateKey)

        if (!roles.includes('comprador')) {
            return res.status(401).json({
                msg: 'No tienes permisos para realizar esta acción'
            })
        } else {
            next();
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    validarJWT,
    validarAdmin,
    validarVendedor,
    validarComprador
}