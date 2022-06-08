const bcrypt = require('bcryptjs');
const { response, request } = require('express');
const Usuario = require('../models/user');
const jwt = require('../helpers/generarJwt');
const { StatusCodes: code } = require('http-status-codes');
const google = require('../helpers/googleVerify');
const { json } = require('express/lib/response');

module.exports = {
    login: async (req = request, res = response) => {
        const { correo, pass } = req.body;

        try {
            // Verificar si el email existe
            const usuario = await Usuario.findOne({ correo });
            if (!usuario) {
                return res.status(code.BAD_REQUEST).json({
                    msg: 'Usuario / Password no son correctos - correo',
                });
            }
            // Si el usuario esta activo
            if (!usuario) {
                return res.status(code.BAD_REQUEST).json({
                    msg: 'Usuario / Password no son correctos - estado: false',
                });
            }
            // Verificar la contrasena
            const validPass = bcrypt.compareSync(pass, usuario.pass);
            if (!validPass) {
                return res.status(code.BAD_REQUEST).json({
                    msg: 'Usuario / Password no son correctos - password',
                });
            }
            // Generar el Jwt

            const token = await jwt.generar(usuario.id);
            res.json({
                usuario,
                token,
            });
        } catch (error) {
            console.log(error);
            return res.status(code.INTERNAL_SERVER_ERROR).json({
                msg: 'Hable con el administrador',
            });
        }
    },
    googleSignIn: async (req = request, res = response) => {
        const { id_token } = req.body;
        try {
            const googleUser = await google.verify(id_token);
            console.log(googleUser);
            res.status(code.OK).json({
                msg: 'Todo bien',
                id_token,
            });
        } catch (error) {
            res.status(code.BAD_REQUEST).json({
                ok: false,
                msg: 'El token no se pudo verificar',
            });
        }
    },
};
