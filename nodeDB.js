const app = require( "express" )();
const bp = require( "body-parser" );
app.use(bp.json());
app.use(bp.urlencoded({ extended: true}));

function logginReply( user ){

    app.post( "/loggedUser", function( request, response, undefined, user ){

        response.json(user);

    });

}

class User{

    constructor( connection, userId, response ){
        connection.query( "select * from user where idUser = " + userId + ";", function( error, result, fields, response ){

            if ( error ) throw error;
            const data = result[0];
            const user = {};
            
            for ( let i in data ){
                user[i] = data[i];
            }

            //sessions.users.push( user );
            console.log(user);

            logginReply( user );

        } );
    }

}

module.exports = { User: User, Admin: undefined };