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
    } );
} );

function getDestineType( userType ){
    //console.log( userType )
    if ( userType == "admin" ) return "user"
    else return "admin";
}

function notifyClient( message ){
    const destineType = getDestineType( message.userType );

    const destineSocket = cliSockets[ destineType ][ /*destineId*/ message.destination ];
    //console.log( cliSockets );
    if ( destineSocket != undefined ){
        io.to(destineSocket.id).emit( 'newMen', message );
        //console.log( destineSocket.id );
    }
    else console.log( cliSockets );
}

function sendInitMessages( messages, chat ){
    //console.log( messages );
    io.to( cliSockets.user[ chat.user ].id ).emit( 'oldMessages', messages );
    io.to( cliSockets.admin[ chat.admin ].id ).emit( 'oldMessages', messages );
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

    let datetime = new Date().toISOString()

    datetime = datetime.slice(0, 19).replace('T', ' ');

    response.json( { Message_received: message, date: datetime } );
    message.datetime = datetime;

    //console.log( message );

    // Colocando no Banco de Dados

    function commitMessage( message, datetime ){
        let admin, user;
        if ( message.userType == 'user' ){
            admin = message.destination;
            user = message.user;
        }
        else{
            admin = message.user;
            user = message.destination
        }
        conn.query( ` INSERT INTO chat VALUES ( ${admin}, ${user}, '${datetime}', '${message.userType}', 'text', '${message.text}', null ) `, error => {
            if ( error ){ 
                console.log( error );
                commitMessage( message, datetime );
            }
        } )
    }

    //console.log( datetime );

    commitMessage( message, datetime )

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

module.exports = { 
    cliSockets: cliSockets, 
    http: http,
    connection: conn,
    sendInitMessages: sendInitMessages
};