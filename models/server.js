const express = require('express');
const cors = require('cors');
const dbConnection = require('../database/config');

class Server {

    constructor () {
        this.app = express();
        this.port = process.env.PORT;

        //Conectar a base de datos
        this.conectarDB();
        
        //Middlewares
        this.middlewares();

        //Routes of my app 
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        //CORS
        this.app.use( cors() );

        //Reading and parsing the body
        this.app.use( express.json() );

        //Public directory
        this.app.use( express.static('public') );
    }

    routes(){
        this.app.use( '/', require('../routes/index.routes') );
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}

module.exports = Server;