const bcrypt = require('bcryptjs');

module.exports = {
    encrypt: ( pass ) => {
        //encriptar la pass
        const salt = bcrypt.genSaltSync();
        return bcrypt.hashSync( pass, salt ); 
    }
}
