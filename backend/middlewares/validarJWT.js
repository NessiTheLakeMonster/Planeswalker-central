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
        const rolesArray = roles[0].roles.map(rol => rol.nombre);

        if (!rolesArray.includes('admin')) {
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
        const rolesArray = roles[0].roles.map(rol => rol.nombre);

        if (!rolesArray.includes('vendedor')) {
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

module.exports = {
    validarJWT,
    validarAdmin,
    validarVendedor
}