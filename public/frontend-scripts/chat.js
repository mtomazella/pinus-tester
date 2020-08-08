const socket = io();

let destinationId = undefined;

/*socket.on( "connect", () => {
    console.log( socket.id );
} )*/

socket.on( 'newMen', message => {
    console.log( message );
    const newMen = new Men();
    newMen.owner = false;
    newMen.setText( message.text );
    newMen.show();
} )

socket.on( 'oldMessages', messages => {
    //console.log( messages );

    if ( session.type == 'user' ) destinationId = messages[ 0 ].idAdmin
    else destinationId = messages[ 0 ].idUser;

    for ( let i in messages ){
        const newMen = new Men( );
        newMen.datetime = messages[ i ].datetime;
        if ( messages[ i ].sender == session.type ) newMen.owner = true;
        if ( messages[ i ].type == 'text' ) newMen.setText( messages[ i ].text );
        newMen.show( );
    }
} )