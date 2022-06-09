const { Router } = require('express');
const { check } = require('express-validator');
const categoryControllers = require('../controllers/category');
const middlewares = require('../middlewares');
const validar = require('../helpers/dbValidator');

//Configuracion de rutas
const router = Router();

// Middleware para las url que reciben :id para consultar que exista esa categoria
router
    .route('/')
    .get(categoryControllers.get)
    .post(
        [
            middlewares.jwt,
            check('nombre', 'El nombre es obligatorio').notEmpty(),
            middlewares.validateInputs,
        ],
        categoryControllers.create
    );

router
    .route('/:id')
    .get(
        [
            check('id', 'No es un id de Mongo valido').isMongoId(),
            check('id').custom(validar.categoryExistById),
            middlewares.validateInputs,
        ],
        categoryControllers.getOneById
    )
    .put(
        [
            middlewares.jwt,
            check('nombre', 'El nombre es obligatorio').notEmpty(),
            check('id', 'No es un id de Mongo valido').isMongoId(),
            check('id').custom(validar.categoryExistById),
            middlewares.validateInputs,
        ],
        categoryControllers.update
    )
    .delete(
        [
            middlewares.jwt,
            middlewares.isAdminRole,
            check('id', 'No es un id de Mongo valido').isMongoId(),
            check('id').custom(validar.categoryExistById),
            middlewares.validateInputs,
        ],
        categoryControllers.delete
    );
module.exports = router;
