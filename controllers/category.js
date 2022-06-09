const { response, request } = require('express');
const { StatusCodes: code } = require('http-status-codes');
const { Categoria } = require('../models');

//Estos son los controladores para mis rutas - funciones que se ejecutan al recibir una solicitud en alguna ruta
module.exports = {
    //Obtener todas las categorias - publico
    // paginado - total - papulate( mongo )
    get: async (req = request, res = response) => {
        try {
            const { limite = 5, desde = 0 } = req.query;
            const estado = { estado: true };

            const [total, categoria] = await Promise.all([
                Categoria.countDocuments(estado),
                Categoria.find(estado)
                    .populate('usuario', 'nombre')
                    .skip(Number(desde))
                    .limit(Number(limite)),
            ]);

            res.status(code.OK).json({
                total,
                categoria,
            });
        } catch (error) {
            res.status(code.INTERNAL_SERVER_ERROR).json({
                msg: `Ha ocurrido un error: ${error}`,
            });
        }
    },
    //Obtener una categoria por id - publico
    // populate
    getOneById: async (req = request, res = response) => {
        try {
            const { id } = req.params;
            const categoria = await Categoria.findById(id).populate(
                'usuario',
                'nombre'
            );
            res.status(code.OK).json({ categoria });
        } catch (error) {
            res.status(code.INTERNAL_SERVER_ERROR).json({
                msg: `Ha ocurrido un error: ${error}`,
            });
        }
    },
    //Crear categoria - privado - cualquier persona con un token valido
    //Post
    create: async (req = request, res = response) => {
        try {
            const nombre = req.body.nombre.toUpperCase();
            const categoriaDB = await Categoria.findOne({ nombre });
            if (categoriaDB) {
                return res.status(code.BAD_REQUEST).json({
                    msg: `La categoria ${categoriaDB.nombre}, ya existe`,
                });
            }
            //Generar la data a guardar
            const data = {
                nombre,
                usuario: req.usuario._id,
            };

            const categoria = await new Categoria(data);

            await categoria.save();

            res.status(code.CREATED).json({ categoria });
        } catch (error) {
            res.status(code.INTERNAL_SERVER_ERROR).json({
                msg: `Ha ocurrido un error: ${error}`,
            });
        }
    },
    //Actualizar categoria - privado - cualquier persona con un token valido
    //Put
    update: async (req = request, res = response) => {
        try {
            const { id } = req.params;
            const { estado, usuario, ...data } = req.body;
            data.nombre = data.nombre.toUpperCase();
            data.usuario = req.usuario._id;
            const categoria = await Categoria.findByIdAndUpdate(id, data, {
                new: true,
            });
            res.status(code.OK).json(categoria);
        } catch (error) {
            res.status(code.INTERNAL_SERVER_ERROR).json({
                msg: 'Ha ocurrido un error: ',
                error,
            });
        }
    },
    //Borrar una categoria - Rol Admin
    //Delete - cambiar estado: false
    delete: async (req = request, res = response) => {
        try {
            const { id } = req.params;
            const categoriaBorrada = await Categoria.findByIdAndUpdate(
                id,
                { estado: false },
                { new: true }
            );
            res.status(code.OK).json(categoriaBorrada);
        } catch (error) {
            res.status(code.INTERNAL_SERVER_ERROR).json({
                msg: 'Ha ocurrido un error: ',
                error,
            });
        }
    },
};
