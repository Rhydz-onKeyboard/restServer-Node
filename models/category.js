const { Schema, model } = require('mongoose');

//Es la clase, estructura o modelo para las categorias, esto esta en la documetacion de MongoDB
const CategoriaSchema = Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre es obligatorio'],
        unique: true,
    },
    estado: {
        type: Boolean,
        default: true,
        require: true,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuarios',
        require: true,
    },
});

CategoriaSchema.methods.toJSON = function () {
    const { __v, estado, ...data } = this.toObject();
    return data;
};

module.exports = model('Categorias', CategoriaSchema);
