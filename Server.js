/* Require */

const express   = require( 'express' )    
const app       = express( );
const http      = require( 'http' ).Server( app );
const io        = require( 'socket.io' )  ( http );
const config    = require( './config.json' );

const cliSockets = { user: { }, admin: { } };
const sessions = {
    "user": {},
    "admin": {},
    "freeuser": [],
    "freeadmin": [],
    "actvChats": []
}

/* Iniciando WebServer */

http.listen( config.serverPort, config.serverURL );
app.use( express.static( 'public' ) );

/* Roteamento */

app.get( '/', ( request, response ) => {
    response.sendFile( __dirname + config.htmlFolder + 'index.html' );
} )

/* Conexão com a DB */

const conn = require( 'mysql' ).createConnection( config.sqlConfig );
conn.connect( error => {
    if ( error ) throw error;
    console.log( "conectado lindamente ao banco de dados: " + conn.threadId );
} )

/* Socket.io listeners */

io.on( 'connect', socket => {
    socket.on( 'chatPost', message => {
        const datetime = new Date( ).toISOString( ).slice( 0, 19 ).replace( 'T', ' ' );
        message.datetime = datetime;
        commitMessage( message );
    } );
    socket.on( 'login', session => {
        cliSockets[ session.type ][ session.id ] = socket;
        new User( session.id, session.type ).then( session => { sendUserInformation( session, socket ) } ).catch( error => { 
            console.log( error );
            loginError( socket );
        } );
    } );
    socket.on( 'logout', session => {
        logout( session );
    } )
} );





/* Funções */

// Banco de Dados

function commitMessage( message ){
    let admin, user;
    if ( message.userType == 'user' ){
        admin = message.destination;
        user = message.user;
    }
    else{
        admin = message.user;
        user = message.destination
    }
    conn.query( ` INSERT INTO chat VALUES ( ${admin}, ${user}, '${message.datetime}', '${message.userType}', 'text', '${message.text}', null ) `, error => {
        if ( error ){ 
            console.log( error );
            commitMessage( message );
            notifyClient( message );
        }
    } );
}

async function query( table, id, resolve, reject ){
    conn.query( "select * from " + table + " where id = " + id + ";", function( error, Qresult ){
        if ( error ) reject( "505" ); // Server error
        let data;
        try{
            data = Qresult[0];
        }
        catch{ reject( "404" ) }
        const user = {};
        for ( let i in data ){
            user[i] = data[i];
        }
        user.type = table;
        if ( sessions[table][ id ] == undefined && user.id != undefined ){
            sessions[ table ][ id ] = user;
            sessions[ "free" + table ].push( id );
        }
        resolve( user );
    } );
}

class User{
    constructor( userId, userType ){
        return new Promise( ( resolve, reject ) => {
            query( userType, userId, resolve, reject );
        } );
    }
}

function queryMessages( chat ){
    return new Promise( ( resolve, reject ) => {
        conn.query( " SELECT * FROM CHAT WHERE idUser =  " + chat.user + " AND idAdmin =  " + chat.admin + " ORDER BY datetime;", ( error, Qresult ) => {
            if ( error ) reject( error );
            const messages = [];
            for ( let i in Qresult ){
                const newMessage = {};
                for ( let j in Qresult[ i ] ){
                    newMessage[ j ] = Qresult[ i ][ j ];
                }
                messages.push( newMessage );
            }
            resolve( messages );
        } );
    } );
}

// Comunicação

function notifyClient( message ){
    const destineType = getDestineType( message.userType );
    const destineSocket = cliSockets[ destineType ][ message.destination ];
    if ( destineSocket != undefined ){
        io.to( destineSocket.id ).emit( 'newMen', message );
    }
    else console.log( cliSockets );
}

function sendInitMessages( messages, chat ){
    io.to( cliSockets.user[ chat.user ].id ).emit( 'oldMessages', messages );
    io.to( cliSockets.admin[ chat.admin ].id ).emit( 'oldMessages', messages );
}

function initializeChat( chat ){
    queryMessages( chat ).then( messages => {
        sendInitMessages( messages, chat );
    } ).catch( error => {
        throw error;
    } )
}

function sendUserInformation( session, socket ){
    io.to( socket.id ).emit( 'userInfo', session );
}
function loginError( socket ){
    io.to( socket.id ).emit( 'loginError' );
}

// Conexão

function chatConnect( ){ 
    // Procura pelo usuário mais que está a mais tempo sem ser atendido
    // Deve ser chamada a cada login, sendo ele de admin ou usuário
    return new Promise( ( resolve ) => {
        if ( sessions.freeadmin[0] != undefined && sessions.freeuser[0] != undefined ){
            const chat = { user: sessions.freeuser.shift(), admin: sessions.freeadmin.shift() };
            sessions.actvChats.push( chat );
            initializeChat( chat );
            resolve ( chat );
        }
    } );
}

function logout( user ){
    sessions[user.type][ user.id ] = undefined;
    for( let i in sessions[ "free" + user.type ] ){
        if ( sessions[ "free" + user.type ][i].id == user.id ){
            sessions[ "free" + user.type ][i] = undefined;
            break;
        }
    }
    for ( let i in sessions.actvChats ){
        if ( sessions.actvChats[i][ user.type ] == user.id ){
            sessions.actvChats[i] = undefined;
            break;
        }
    }
}

// Outros

function getDestineType( userType ){
    if ( userType == "admin" ) return "user"
    else return "admin";
}