const app = require( "express" )();
const bp = require( "body-parser" );
app.use(bp.json());
app.use(bp.urlencoded({ extended: true}));
const sessions = {
    "user": {},
    "admin": {},
    "freeuser": [],
    "freeadmin": [],
    "actvChats": []
}

async function query( connection, table, id, resolve, reject ){
    connection.query( "select * from " + table + " where id = " + id + ";", function( error, Qresult ){
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

        //console.log(user);
        if ( sessions[table][ id ] == undefined && user.id != undefined ){
            sessions[ table ][ id ] = user;
            sessions[ "free" + table ].push( id );
        }
        //console.log( sessions );
        resolve( user );
    } );
}

class User{
    constructor( connection, userId ){
        return new Promise( ( resolve, reject ) => {
            query( connection, "user", userId, resolve, reject );
        } );
    }
}
class Admin{
    constructor( connection, adminId ){

        return new Promise( ( resolve, reject ) => {
            query( connection, "admin", adminId, resolve, reject );
        } );
    }
}

function chatConnect( ){ 
    // Procura pelo usuário mais que está a mais tempo sem ser atendido
    // Deve ser chamada a cada login, sendo ele de admin ou usuário
    return new Promise( ( resolve ) => {
        if ( sessions.freeadmin[0] != undefined && sessions.freeuser[0] != undefined ){
            const chat = { user: sessions.freeuser.shift(), admin: sessions.freeadmin.shift() };
            sessions.actvChats.push( chat );
            //console.log( sessions );
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
    //console.log( sessions )
}

function initializeChat( chat ){

    function queryMessages( chat ){
        return new Promise( ( resolve, reject ) => {
            const { connection } = require( "./nodeApp" );
            connection.query( " SELECT * FROM CHAT WHERE idUser =  " + chat.user + " AND idAdmin =  " + chat.admin + " ORDER BY datetime;", ( error, Qresult ) => {
                if ( error ) reject( error );
        
                const messages = [];

                for ( let i in Qresult ){
                    const newMessage = {};
                    for ( let j in Qresult[ i ] ){
                        newMessage[ j ] = Qresult[ i ][ j ];
                    }
                    messages.push( newMessage );
                }
                //console.log( messages );

                resolve( messages );
            } );
        } );
    }

    const { sendInitMessages } = require( "./nodeApp" );

    queryMessages( chat ).then( messages => {
        sendInitMessages( messages, chat );
    } ).catch( error => {
        throw error;
    } )
}

module.exports = {
    User: User, 
    Admin: Admin, 
    chatConnect: chatConnect, 
    logout: logout, 
    sessions: sessions 
};