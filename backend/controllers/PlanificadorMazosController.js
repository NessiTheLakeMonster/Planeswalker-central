const { response } = require('express')
const ConexionPlanificadorMazos = require('../database/ConexionPlanificadorMazos')
const ConexionCartas = require('../database/ConexionCartas');

const checkCartaLegalFormat = async (req, res = response) => {
    let conx = new ConexionPlanificadorMazos();

    try {
        let resultado = await conx.checkCartaLegalFormat(req.body.idCartaAPI, req.body.formato);

        if (resultado) {
            res.json({
                ok: true,
                resultado
            });
        } else {
            res.status(404).json({
                ok: false,
                error: "Carta no legal en formato"
            });
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            error
        });
    }
}

const getCartasPorTipo = async (req, res = response) => {
    let conx = new ConexionPlanificadorMazos();

    try {
        let resultado = await conx.getCartasByType(2, req.body.tipo);

        if (resultado) {
            res.json({
                ok: true,
                resultado: resultado
            });
        } else {
            res.status(404).json({
                ok: false,
                error: "No se encontraron cartas"
            });
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            error
        });
        console.log(error);
    }
}

const recomendacionMazo = async (req, res = response) => {
    const conxCartas = new ConexionCartas();
    const conxPlanificador = new ConexionPlanificadorMazos();

    const commanderLength = 100;
    const standardLength = 60;
    let mazoLength = 0;

    /* const mazo = await conxPlanificador.postRecomendacionMazo(req.body); */

    // Se establece la cantidad de cartas que se añadiran según el formato
    if (req.body.formato === 'Commander') {
        mazoLength = commanderLength;
    } else if (req.body.formato === 'Standard') {
        mazoLength = standardLength;
    }

    const cartas = []


    /* while (checkMazoLleno(6, cartas) === false) {
        // Se añaden las cartas de cada tipo
        const tierra = await conxPlanificador.getCartasByType(3, 'Land');
        cartas.push(...tierra);
        
        const carta = await conxPlanificador.getCartasByType(3, 'Creature');
        cartas.push(...carta);

        console.log(cartas.length);
    } */

    await addCreatureCards(conxPlanificador, cartas, 20);
    console.log(cartas.length);

    res.json({
        cartas: cartas
    });
}

checkMazoLleno = (mazoLenght, cartas) => {
    let mazoLleno = false;

    if (mazoLenght === cartas.length) {
        mazoLleno = true;
    }

    return mazoLleno;
}

const addCreatureCards = async (conxPlanificador, cartas, maxCartas) => {

    const todasLasCriaturas = await conxPlanificador.getCartasByType(100, 'Creature'); // obtener más de 20 para tener de dónde elegir

    // Definir los requisitos de CMC
    const cmcRequisitos = [
        { cmc: 1, min: 0, max: 2 },
        { cmc: 2, min: 4, max: 6 },
        { cmc: 3, min: 3, max: 5 },
        { cmc: 4, min: 2, max: 4 },
        { cmc: 5, min: 2, max: 4 },
        { cmc: 6, min: 0, max: 2 },
        { cmc: 7, min: 0, max: 2 },
        { cmc: 8, min: 0, max: 2 },
        { cmc: 9, min: 0, max: 2 },
        { cmc: 10, min: 0, max: 2 },
        { cmc: 11, min: 0, max: 2 },
        { cmc: 12, min: 0, max: 2 }
    ];

    // Organizar las cartas por CMC en un objeto
    const cartasPorCMC = {};
    todasLasCriaturas.forEach(carta => {
        if (!cartasPorCMC[carta.cmc]) {
            cartasPorCMC[carta.cmc] = [];
        }
        cartasPorCMC[carta.cmc].push(carta);
    });

    const resultado = [];

    // Algoritmo realizado con backtracking
    const rellenarCartasCriatura = (idRequisitos, currentCount, currentCartas) => {
        if (currentCount > maxCartas) return false; // Si excede 20 cartas, no es una solución válida
        if (idRequisitos === cmcRequisitos.length) {
            if (currentCount === maxCartas) {
                resultado.push(...currentCartas);
                return true;
            }
            return false;
        }

        const { cmc, min, max } = cmcRequisitos[idRequisitos];
        const cartasDisponibles = cartasPorCMC[cmc] || [];

        for (let count = min; count <= Math.min(max, cartasDisponibles.length); count++) {
            const nuevasCartas = cartasDisponibles.slice(0, count);

            // Llamada recursiva
            if (rellenarCartasCriatura(idRequisitos + 1, currentCount + count, currentCartas.concat(nuevasCartas))) {
                return true;
            }
        }
        return false;
    };

    rellenarCartasCriatura(0, 0, []); 
    cartas.push(...resultado);
};

module.exports = {
    checkCartaLegalFormat,
    getCartasPorTipo,
    recomendacionMazo
}