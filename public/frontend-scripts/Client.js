/* HTML components */

const minChat   = document.getElementById( "minChat" );
const maxChat   = document.getElementById( "maxChat" );
const conx      = document.getElementById( "conx" );
const input     = document.getElementById( 'input' );
const chat      = document.getElementById("chat");
const userId    = document.getElementById("userCode");
const typedd    = document.getElementById( "chatType" );
const body      = document.getElementsByTagName("body")[0];


/* Global Data */

const mens = [ ];
let session;

/* Socket.io */

const socket = io();

/* Message Class */

class Men {
    constructor ( ) {
        return this;
    }
    show ( ) {
        mens.push( this );
        let owner = "";
        if ( this.owner ) owner = 'owner';

        chat.innerHTML += " <div class='message " + owner + " ' id=' msg" + mens.length + " '> " + this.text + " </div>"

        setInterval(()=>{
            document.querySelector("#chat").scrollTop=10000;
        }, 500);
    }
}

/* ChatPost */

function post ( ) {
    const newMen = new Men( );
    newMen.owner = true;
    newMen.userType = typedd.options[typedd.selectedIndex].value;
    newMen.user = userId.value;

    if( newMen.user == "" || destinationId == undefined ) return 2;
    if ( !input.value.trim() ){
        input.value = "";
        return 1;
    }; 

    newMen.setText( input.value );
    newMen.destination = destinationId;
    input.value = "";

    newMen.show(); 

    /* Data Transfer */

    socket.emit( 'chatPost', newMen );
}

/* Login/out */

function connect( ) {
    const userType = typedd.options[typedd.selectedIndex].value;
    socket.emit( 'login', { 
        id: userId.value, 
        type: userType
    } );
}

socket.on( 'userInfo', info => {
    session = info;
    setUserInfo( );
} );
socket.on( 'loginError', ( ) => {
    console.log( "Erro no login" );
} )

function logout( ) {
    io.emit( 'logout', session );
}