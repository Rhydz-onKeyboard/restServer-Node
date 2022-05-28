const { request, response } = require('express');
const { StatusCodes:code } = require('http-status-codes');

module.exports = {
    isAdminRole: ( req = request, res = response, next) => {

        if ( !req.usuario ){
            return res.status(code.INTERNAL_SERVER_ERROR).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            });
        }
        const { rol, nombre } = req.usuario;
        
        if ( rol !== 'ADMIN_ROLE' ) {
            return res.status(code.UNAUTHORIZED).json({
                msg: `${ nombre } no es administrador - No puede realizar la operacion`
            });
        }

        next();
    },
    hasRole: ( ...roles ) => {
        return (req = request, res = response, next) => {

            if ( !req.usuario ){
                return res.status(code.INTERNAL_SERVER_ERROR).json({
                    msg: 'Se quiere verificar el role sin validar el token primero'
                });
            }
            if ( !roles.includes( req.usuario.rol )) {
                return res.status(code.UNAUTHORIZED).json({
                    msg: `EL servicio requiere uno de estos roles ${ roles }`
                });
            }
            
            next();
        }
    }
}