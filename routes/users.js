const { Router } = require('express');
const { check } = require('express-validator');
const userControllers = require('../controllers/users');

const validar = require('../helpers/dbValidator');

const middlewares = require('../middlewares')

const router = Router();

router.route('/')
    .get(userControllers.get)
    .post([ 
        check('nombre', 'El nombre es obligatorio').not().isEmpty(), 
        check('pass', 'El password debe tener mas de 6 caracteres').isLength({ min: 6 }), 
        check('correo', 'El correo no es valido').isEmail(),
        check('correo').custom( validar.emailExist ),
        check('rol').custom( validar.isRoleValid ),
        middlewares.validateInputs
        ], userControllers.post)
    
    .patch(userControllers.patch)

router.route('/:id')
    .put([
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom( validar.userExistById ),
        check('rol').custom( validar.isRoleValid ),
        middlewares.validateInputs
        ], userControllers.put)
    
    .delete([
        middlewares.jwt,
        // middlewares.isAdminRole, //middleware por obligacion debe ser Admin rol
        middlewares.hasRole('ADMIN_ROLE','VENTAS_ROLE'), // En los argumentos envio los roles que tendran el privilegio de eliminar usuarios
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom( validar.userExistById ),
        middlewares.validateInputs
        ], userControllers.delete)

module.exports = router;