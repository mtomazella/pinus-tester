const app = require( "express" )();
const bp = require( "body-parser" );
app.use(bp.json());
app.use(bp.urlencoded({ extended: true}));
const sessions = {

    "users": [],
    "admins": [],
    "actvChats": []

}

class User{

    constructor( connection, userId ){

        return new Promise( ( resolve, reject ) => {
            connection.query( "select * from user where idUser = " + userId + ";", function( error, Qresult ){
                if ( error ) reject( error );
                const data = Qresult[0];
                const user = {};
                
                for ( let i in data ){
                    user[i] = data[i];
                }
    
                resolve( user );
            } );
        } );
    }

}

class Admin{

    constructor( connection, adminId ){

        return new Promise( ( resolve, reject ) => {
            connection.query( "select * from admin where idAdmin = " + adminId + ";", function( error, Qresult ){
                if ( error ) reject( error );
                const data = Qresult[0];
                const admin = {};
                
                for ( let i in data ){
                    admin[i] = data[i];
                }
    
                resolve( admin );
            } );
        } );
    }

}

module.exports = { User: User, Admin: Admin };