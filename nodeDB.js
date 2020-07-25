const { Sequelize, Model, DataTypes } = require( "sequelize" );
const { request } = require("express");
let config = require("./config.json");
config = config.sqlConfig;

const DB = new Sequelize( config.database, config.user, config.password, config.host );

try{
    DB.authenticate( );
}
catch ( error ){
    console.error( error );
    return error;
}


const chat = DB.define( "chat" );


function insertMessage( message ){

    //const formated = [ message.admin, message.user, message.datetime, "text", message.text, null ]
const formatted = message.admin + ", " + message.user + ", " + message.datetime + ", " + "\"text\"" + ", \"" + message.text + "\",  null";

    DB.query( "insert into chat values ( " + formatted + ");" ).then( function(rows){ console.log(rows); return rows; } ).catch(function(error){console.log(error); return error;});

}


module.exports = {DB: DB, Chat: chat, insertMessage: insertMessage};