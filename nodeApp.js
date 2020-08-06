const express   = require( "express" );
const app       = express();
const http      = require( "http" ).Server( app );
const bp        = require( "body-parser" );
const config    = require( './config.json' );
const Database  = require( "./nodeDB" );
const io        = require( "socket.io" )( http );




/* Criando Web Server */

http.listen( config.serverPort, config.serverURL );

function sendPage( path, file ){
    app.get(path, function( request, response ){
        response.sendFile( __dirname + config.htmlFolder + file );
    } );
}




/* Abrindo WebSocket Server */ 

const cliSockets = { 
    admin: {},
    user: {}
};

io.on( "connect", ( socket ) => { 
    socket.on( "setSoc", message => {
        cliSockets[ message.type ][ message.id ] = socket;
        //console.log( cliSockets )
    } )
} );

function notifyClient( message ){
    let destineType = "admin";
    if ( message.userType == "admin" ) destineType = "user";
    let destineId = undefined;
    for ( let i in Database.sessions.actvChats ){
        if ( Database.sessions.actvChats[ i ][ message.userType ] == message.user ){
            destineId = Database.sessions.actvChats[ i ][ destineType ];
            break;
        }
    }

    const destineSocket = cliSockets[ destineType ][ destineId ];
    //console.log( cliSockets );
    if ( destineSocket != undefined ){
        io.to(destineSocket.id).emit( 'newMen', message );
        //console.log( destineSocket.id );
    }
    else console.log( cliSockets );
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




/* Ouvindo POST requests */

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

    // Enviando para o destino

    notifyClient( message );

} );

// De usuários logando

app.post( "/userLogin", async ( request, response ) => {

    function reply( user ){
        response.json( user );
        Database.chatConnect();
    }
    function end(error){
        console.log( error )
        response.end( "Erro" );
    }
    
    new Database.User( conn, request.body.id ).then( reply ).catch( end );
} );

// De admins logando

app.post( "/adminLogin", function( request, response ){

    function reply( admin ){
        response.json( admin );
        Database.chatConnect();
    }
    function end( error ){
        console.log( error );
        response.end( "Erro" );
    }

    new Database.Admin( conn, request.body.id ).then( reply ).catch( end );
} );

// Logout

app.post( "/logout", ( request, response ) => {
    Database.logout( request.body );
    response.end( );
} )