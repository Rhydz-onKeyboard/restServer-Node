const { response, request } = require('express');
const { validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');



module.exports = {
    validate: ( req = request, res = response, next ) => {
        const errors = validationResult(req);
        if ( !errors.isEmpty() ) {
           return res.status(StatusCodes.BAD_REQUEST).json(errors);
        };

        next();
    }
}