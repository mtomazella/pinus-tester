$( document ).ready( ( ) => {
    $( 'input' ).keydown( ( event ) => {
        if ( event.keyCode == 13 ){
            event.preventDefault();
            post( );
            return true;
        }
    } );
} );

function post ( ) {
    if ( input.value.trim() == '' ) return;
    if ( session == undefined || dest == undefined ){
        alert( 'Falha ao acessar os dados de um dos usuários.' );
        return;
    }
    let userId, adminId;
    if ( session.userType == 'user' ){
        userId = session.id;
        adminId = dest.id;
    }
    else{
        userId = dest.id;
        adminId = session.id;
    }
    const message = {
        idAdmin: adminId,
        idUser: userId,
        sender: session.userType,
        type: 'text',
        text: input.value,
        image: undefined
    }
    input.value = '';
    POSTrequest( APIurl, 'msg', message, 
        ( request ) => {
            const newMen = JSON.parse( request.responseText )[0];
            new Men( newMen.id, newMen.adminId, newMen.idUser, newMen.datetime, newMen.sender, newMen.type, newMen.text, newMen.image ).show();
        } );    
}