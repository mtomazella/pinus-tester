const express = require( "express" );
const app = express();
const bp = require( "body-parser" );
const config = require( './config.json' );
const Database = require( "./nodeDB" );
const sessions = {

    "users": [],
    "admins": [],
    "actvChats": []

}




/* Criando Web Server */

app.listen( config.serverPort );

function sendPage( path, file ){

    app.get(path, function( request, response ){

        response.sendFile( __dirname + config.htmlFolder + file );

    } );

}




/* Definindo páginas */

sendPage( "/", config.defaultPage );
sendPage( "/teste", config.testPage );
app.use( express.static( 'public' ) ); //Libera a pasta public para ser disponibilizada para o usuário.




/* Abrindo conexão com BD */
const sql = require( "mysql" );
const conn = sql.createConnection( config.sqlConfig );
conn.connect( function( error ){
    if ( error ) throw error;
    console.log( "conectado lindamente ao banco de dados: " + conn.threadId );
} );




/* Ouvindo post requests */

app.use(bp.json());
app.use(bp.urlencoded({ extended: true}));

// De mensagens no chat

app.post( "/chatPost", function( request, response ){

    /* Recebendo mensagem */

    const message = request.body;

    // Respondendo 

    const datetime = new Date().toLocaleDateString( "en-US", config.dateOpt );
    response.json( { Feeback: "got it, bb", Message_received: message, date: datetime } );
    message.datetime = datetime;

    console.log( message );

    // Colocando no Banco de Dados

    

} );

// De usuários logando

app.post( "/userLogin", function( request, response ){

    const message = request.body;
    //console.log( message );

    const user = new Database.User( conn, message.id);

} );

// De admins logando

app.post( "/adminLogin", function( request, response ){

    console.log( request.body );

    // Respondendo 

    response.json( { Feeback: "Logado" } );

} );