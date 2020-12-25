const minChat               = document.getElementById( "minChat" );
const maxChat               = document.getElementById( "maxChat" );
const conx                  = document.getElementById( "conx" );
const input                 = document.getElementById( 'input' );
const chat                  = document.getElementById( "chat" );
const userEmail             = document.getElementById( "userEmail" );
const userPass              = document.getElementById( "userPass" );
const typedd                = document.getElementById( "chatType" );
const supportQueueSelector  = document.getElementById( "debug_userId" );
const debug                 = document.getElementById( "debugDiv" )

const APIurl = 'http://pinus-api.herokuapp.com';
//const APIurl = 'http://localhost:3305';
let session;

const realTime = new RealTime( );