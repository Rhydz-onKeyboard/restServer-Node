const { response, request } = require('express');
const { StatusCodes: code } = require('http-status-codes');
const encriptar = require('../helpers/encrypt');
const Usuario = require('../models/user');

module.exports = {
    get: async (req = request, res = response) => {
        const { limite = 5, desde = 0 } = req.query;
        const estado = { estado: true };

        const [total, usuarios] = await Promise.all([
            Usuario.countDocuments(estado),
            Usuario.find(estado).skip(Number(desde)).limit(Number(limite)),
        ]);

        res.status(code.OK).json({
            total,
            usuarios,
        });
    },
    post: async (req = request, res = response) => {
        const { nombre, correo, pass, rol } = req.body;
        const usuario = new Usuario({ nombre, correo, pass, rol });
        //encriptar la pass
        usuario.pass = encriptar.encrypt(pass);

        //guardar en db
        await usuario.save();

        res.status(code.CREATED).json({
            usuario,
        });
    },
    put: async (req = request, res = response) => {
        const { id } = req.params;
        const { _id, pass, google, correo, ...resto } = req.body;

        if (pass) {
            resto.pass = encriptar.encrypt(pass);
        }

        const usuario = await Usuario.findByIdAndUpdate(id, resto);

        res.status(code.OK).json({
            usuario,
        });
    },
    patch: (req = request, res = response) => {
        res.status(code.OK).json({
            msg: 'patch API - controller',
        });
    },
    delete: async (req = request, res = response) => {
        const { id } = req.params;
        const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
        const usuarioAutenticado = req.usuario;
        res.status(code.OK).json({
            usuario,
            usuarioAutenticado,
        });
    },
};
