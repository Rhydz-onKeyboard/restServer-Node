const { Router } = require('express');
const { check } = require('express-validator');
const userControllers = require('../controllers/users');
const validarCampos = require('../middlewares/validarCampos');
const validar = require('../helpers/dbValidator');
const { ValidatorsImpl } = require('express-validator/src/chain');

const router = Router();

router.route('/')
    .get(userControllers.get)
    .post([ 
        check('nombre', 'El nombre es obligatorio').not().isEmpty(), 
        check('pass', 'El password debe tener mas de 6 caracteres').isLength({ min: 6 }), 
        check('correo', 'El correo no es valido').isEmail(),
        check('correo').custom( validar.emailExist ),
        check('rol').custom( validar.isRoleValid ),
        validarCampos.validate
        ], userControllers.post)
    
    .patch(userControllers.patch)

router.route('/:id')
    .put([
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom( validar.userExistById ),
        check('rol').custom( validar.isRoleValid ),
        validarCampos.validate
        ], userControllers.put)
    
    .delete([
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom( validar.userExistById ),
        validarCampos.validate
        ], userControllers.delete)

module.exports = router;