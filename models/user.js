const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre es obligatorio'],
    },
    correo: {
        type: String,
        require: [true, 'El correo es obligatorio'],
        unique: true,
    },
    pass: {
        type: String,
        require: [true, 'La contrasena es obligatoria'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        require: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE'],
    },
    estado: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    },
});

UsuarioSchema.methods.toJSON = function() {
    const { __v, pass, ...usuario } = this.toObject();
    return usuario;
};

module.exports = model( 'Usuarios', UsuarioSchema );