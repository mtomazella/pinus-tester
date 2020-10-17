let session = { };
let dest = { };
let allMessages = [ ];

function connect ( ) {
    const type = typedd.options[typedd.selectedIndex].value;
    GETrequest( APIurl, type, `id=${ userId.value }`, 
        ( request ) => {
            const user = JSON.parse( request.responseText );
            session = user[0];
            if ( session != undefined ) session.userType = type;
            setUserInfo();
        },
        ( error ) => {
            console.log( error );
        } );
}

function setUserInfo( ){
    //console.log(session);
    if ( session == undefined || session[ "email" ] == undefined ){
        document.getElementById( "userInfo" ).style.display = "none";
        alert( "Usuário não encontrado. Cadastre este usuário ou contate o suporte." );
        return;
    }
    const props = [ "displayName", "name", "email", "id" ];
    const labelName = [ "DName", "Name", "E-mail", "Id" ];
    for ( let i in props ){
        const label = props[ i ];
        document.getElementById( label ).innerHTML = labelName[i] + ": " + session[label];
    }
    document.getElementById( "userInfo" ).style.display = "flex";
}

function chatConnect ( ) {
    const type = ( typedd.options[typedd.selectedIndex].value == 'admin' ) ? 'user' : 'admin';
    GETrequest( APIurl, type, `id=${destId.value}`, 
        ( result ) => {
            dest = JSON.parse( result.responseText )[0];
            if ( dest != undefined ) dest.userType = type;
            setChatInfo();
            chat.innerHTML = '';
            updateMessages();
            intervalLoadMessages();
        },
        ( error ) => {
            console.log( error );
        } );
}

function setChatInfo ( ) {
    if ( dest == undefined || dest[ "email" ] == undefined ){
        alert( "Usuário não encontrado. Cadastre este usuário ou contate o suporte." );
        return;
    }
    chatTitle.innerText = `${dest.id} - ${dest.displayName}`;
}

function intervalLoadMessages ( ) {
    setInterval( ( ) => {
        updateMessages();
    }, 100 );
}

function updateMessages ( ) {
    let userId, adminId;
    if ( session == undefined || dest == undefined ){
        alert( 'Falha ao acessar os dados de um dos usuários.' );
        return;
    }
    if ( session.userType == 'user' ){
        userId = session.id;
        adminId = dest.id;
    }
    else{
        userId = dest.id;
        adminId = session.id;
    }
    GETrequest( APIurl, 'msg', `idUser=${userId}&idAdmin=${adminId}`,
        ( result ) => {
            const messages = JSON.parse( result.responseText );
            //console.log(messages)
            if ( messages != undefined ) {
                messages.forEach( ( message ) => {
                    if ( allMessages.find( ( inMessage ) => inMessage.id == message.id ) == undefined )
                        new Men( message.id, message.adminId, message.idUser, message.datetime, message.sender, message.type, message.text, message.image ).show();
                });
            }
        } );
}