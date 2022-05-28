const { validate: validateInputs } = require('../middlewares/validarCampos');
const { validate: jwt } = require('../middlewares/validarJwt');
const { hasRole, isAdminRole } = require('../middlewares/validarRol');

module.exports = {
    validateInputs,
    jwt,
    hasRole, 
    isAdminRole
}