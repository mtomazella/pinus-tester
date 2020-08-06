let session;

$(window).on( "beforeunload", logout );

function logout(){
    if ( session.id != undefined ){
        postRequest( "/logout", { id: session.id, type: session.type } )
    }
    session = {};
    document.getElementById( "userInfo" ).style.display = "none";
}

function onreadyUserLogin( request ){

    let response;
    try{
        response = JSON.parse( request.responseText );
    }
    catch{ 
        console.log( request.responseText )
        return;
    }
    session = response;
    setUserInfo();
}

function connect(){

    const userType = typedd.options[typedd.selectedIndex].value;
    if ( userType == "user" ) { postRequest( "/userLogin", { id: userId.value, type: userType }, onreadyUserLogin ); }
    else if ( userType == "admin" ) postRequest( "/adminLogin", { id: userId.value, type: userType }, onreadyUserLogin );
    socket.emit( 'setSoc', { type: userType, id: userId.value } );
}

function setUserInfo( ){

    //console.log(session);

    if ( session[ "email" ] == undefined ){
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