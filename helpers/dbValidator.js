const Role = require('../models/role');
const Usuario = require('../models/user');

module.exports = {
    isRoleValid: async ( rol = '' ) => {
        const existeRol = await Role.findOne({ rol });
        if ( !existeRol ) {
            throw new Error(`El rol ${ rol } no esta registrado en la DB`);
        }
    },
    emailExist: async ( correo = '' ) => {
        const existeEmail = await Usuario.findOne({ correo });
        if ( existeEmail ) {
            throw new Error(`El email ${ correo }, ya se encuetra registrado registrado en nuestra DB`);
        }
    },
    userExistById: async ( id = '' ) => {
        const existeUsuario = await Usuario.findById( id );
        if ( !existeUsuario ) {
            throw new Error(`El id ${ id }, no existe en nuestra DB`);
        }
    }
}