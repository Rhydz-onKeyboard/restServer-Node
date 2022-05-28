const { Router } = require('express');
const { check } = require('express-validator');
const authControllers = require('../controllers/auth');
const validarCampos = require('../middlewares/validarCampos');

const router = Router();

router.route('/login')
    .post([
        check('correo', 'El correo es obligatorio').isEmail(),
        check('pass', 'La contrasena es obligatoria').not().isEmpty(),
        validarCampos.validate
    ], authControllers.login);

module.exports = router;
