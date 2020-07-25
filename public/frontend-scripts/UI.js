const minChat = document.getElementById( "minChat" );
const maxChat = document.getElementById( "maxChat" );
const conx = document.getElementById( "conx" );

$( document ).ready( function( ){

    minChat.style.display = "none";
    maxChat.style.display = "block";
    conx.style.display = "none";

} );

function show( ){

    minChat.style.display = "none";
    maxChat.style.display = "block";

}

function hide( ){

    minChat.style.display = "block";
    maxChat.style.display = "none";

}

function conxUI( ){

    let display = conx.style.display;

    if ( display == "none" ) conx.style.display = "flex";
    else conx.style.display = "none";

}