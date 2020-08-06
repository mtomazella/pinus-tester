const socket = io();

socket.on( "connect", () => {
    console.log( socket.id );
} )

socket.on( 'newMen', message => {
    console.log( message );
    const newMen = new Men();
    newMen.owner = false;
    newMen.setText( message.text );
    newMen.show();
} )