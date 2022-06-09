const { validate: validateInputs } = require('./validarCampos');
const { validate: jwt } = require('./validarJwt');
const { hasRole, isAdminRole } = require('./validarRol');

module.exports = {
    validateInputs,
    jwt,
    hasRole,
    isAdminRole,
};
