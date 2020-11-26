const minChat = document.getElementById( "minChat" );
const maxChat = document.getElementById( "maxChat" );
const conx = document.getElementById( "conx" );
const input = document.getElementById( 'input' );
const chat = document.getElementById("chat");
const userId = document.getElementById("userCode");
const typedd = document.getElementById( "chatType" );

//const APIurl = 'http://pinus-api.herokuapp.com';
const APIurl = 'http://localhost:3305';
let session;

const realTime = new RealTime( );