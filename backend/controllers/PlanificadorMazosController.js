const { response } = require('express')
const ConexionPlanificadorMazos = require('../database/ConexionPlanificadorMazos')
const ConexionCartas = require('../database/ConexionCartas');

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

    let mazoLength = 0;
    let requisitos = [];

    // Se establece la cantidad de cartas que se añadirán según el formato
    if (req.body.formato === 'Commander') {
        mazoLength = 100;
        requisitos = [
            { tipo: 'Land', min: 37, max: 40 },
            { tipo: 'Creature', min: 25, max: 30 },
            { tipo: 'Sorcery', min: 5, max: 10 },
            { tipo: 'Instant', min: 5, max: 10 },
            { tipo: 'Enchantment', min: 5, max: 10 },
            { tipo: 'Artifact', min: 5, max: 10 },
            { tipo: 'Planeswalker', min: 3, max: 5 }
        ];

    } else if (req.body.formato === 'Standard') {
        mazoLength = 60;
        requisitos = [
            { tipo: 'Land', min: 24, max: 24 },
            { tipo: 'Creature', min: 20, max: 24 },
            { tipo: 'Sorcery', min: 4, max: 8 },
            { tipo: 'Instant', min: 4, max: 8 },
            { tipo: 'Enchantment', min: 2, max: 4 },
            { tipo: 'Artifact', min: 2, max: 4 },
            { tipo: 'Planeswalker', min: 1, max: 2 }
        ];
    }

    let numCartasPorTipo;
    let longitudMazo;
    let legal = false;

    // Se genera un mazo aleatorio que cumpla con los requisitos establecidos
    do {
        numCartasPorTipo = {};

        for (const req of requisitos) {
            numCartasPorTipo[req.tipo] = Math.floor(Math.random() * (req.max - req.min + 1)) + req.min;
        }

        longitudMazo = Object.values(numCartasPorTipo).reduce((a, b) => a + b, 0);
        console.log(numCartasPorTipo);
        console.log(longitudMazo);
    } while (longitudMazo !== mazoLength);

    const cartas = [];

    // Se añaden las cartas al mazo
    for (const tipo in numCartasPorTipo) {
        const cartasDisponibles = await conxPlanificador.getCartasByType(100, tipo);

        // Se verifica que las cartas sean legales en el formato seleccionado
        legal = cartasDisponibles.every(carta => formatoLegal(req.body.formato, carta));

        const numCartasAñadir = Math.min(numCartasPorTipo[tipo], cartasDisponibles.length);

        if (tipo === 'Creature') {
            await addCreatureCards(conxPlanificador, cartas, numCartasAñadir);
        }

        cartas.push(...cartasDisponibles.slice(0, numCartasAñadir));
    }

    console.log(cartas.length);

    res.json({
        cartas: cartas
    });
};

function formatoLegal(formato, carta) {
    let legal = false;
    for (let i = 0; i < carta.legalities.length; i++) {
        if (carta.legalities[i].format === formato && carta.legalities[i].legality === 'Legal') {
            carta.legalities = carta.legalities[i];
            legal = true;
            break;
        }
    }
    return legal;
}

const addCreatureCards = async (conxPlanificador, cartas, maxCartas) => {

    const randomCriaturas = await conxPlanificador.getCartasByType(100, 'Creature');

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
    randomCriaturas.forEach(carta => {
        if (!cartasPorCMC[carta.cmc]) {
            cartasPorCMC[carta.cmc] = [];
        }
        cartasPorCMC[carta.cmc].push(carta);
    });

    const resultado = [];

    // Algoritmo realizado con backtracking
    const rellenarCartasCriatura = (idRequisitos, currentCount, currentCartas) => {
        if (currentCount > maxCartas) return false; // Si excede el número máximo de cartas se descarta
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
    getCartasPorTipo,
    recomendacionMazo
}