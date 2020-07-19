const express = require( "express" );
const app = express();
const config = require( './config.json' );

app.listen( config.serverPort );

function sendPage( path, file, type ){

    app.get(path, function( request, response ){

        response.sendFile( __dirname + config.htmlFolder + file );

    } );

}

sendPage( "/", config.defaultPage );
sendPage( "/teste", config.testPage );

app.use( express.static( 'public' ) );


const mysql = require( "mysql" );
const connection = mysql.createConnection( config.sqlConfig );

connection.connect( function(error){

    if (error) throw error;
    else console.log("Conectado lindamente ao banco: " /*+ connection.threadId*/);

} );