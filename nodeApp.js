const express = require( "express" );
const app = express();
const { Sequelize, Model, DataTypes } = require( "sequelize" );
const bp = require( "body-parser" );
const Database = require( "./nodeDB" );
const config = require( './config.json' );
const { formatter, insertMessage } = require("./nodeDB");




/* Criando Web Server */

app.listen( config.serverPort );

function sendPage( path, file, type ){

    app.get(path, function( request, response ){

        response.sendFile( __dirname + config.htmlFolder + file );

    } );

}




/* Definindo páginas */
sendPage( "/", config.defaultPage );
sendPage( "/teste", config.testPage );
app.use( express.static( 'public' ) ); //Libera a pasta public para ser disponibilizada para o usuário.




/* Ouvindo post requests */

app.use(bp.json());
app.use(bp.urlencoded({ extended: true}));

app.post( "/chatPost", function( request, response ){

    /* Recebendo mensagem */

    const message = request.body;

    // Respondendo 

    const datetime = new Date().toLocaleDateString( "en-US", config.dateOpt );
    response.json( { Feeback: "got it, bb", Message_received: message, date: datetime } );
    message.datetime = datetime;

    console.log( message );

    // Colocando no Banco de Dados

    Database.insertMessage( message );


} );