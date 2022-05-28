const jwt = require('jsonwebtoken');

module.exports = {
    generar: ( uid = '' ) => {
        return new Promise(( resolve, reject ) => {

            const payload = { uid };

            jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
                expiresIn: '4h'
            }, ( err, token ) => {
                
                if ( err ) {
                    console.log(err);
                    reject('No se pudo generear el token');
                } else {
                    resolve( token );
                }
            })
        })
    }
}