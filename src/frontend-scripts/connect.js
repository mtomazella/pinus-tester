function connect ( ) {
    const userType = typedd.options[typedd.selectedIndex].value;
    $.ajax({
        type: "POST",
        url: `${APIurl}/login`,
        data: {
            email: userEmail.value,
            password: userPass.value,
            type: userType
        },
        success: function (response) {
            session = response.user;
            session.token = response.token;
            if ( userType === 'admin' ) debug.style.display = 'flex';
            setUserInfo( );
            realTime.start( APIurl, userType );
            //realTime.supportRequest();
            realTime.supportQueue();
        }
    });
}

/* Functions */

function setUserInfo( ) {

    if ( session[ "email" ] == undefined ){
        document.getElementById( "userInfo" ).style.display = "none";
        alert( "Usuário não encontrado. Cadastre este usuário ou contate o suporte." );
        return;
    }

    const props = [ "name", "email", "id" ];
    const labelName = [ "Name", "E-mail", "Id" ];

    for ( let i in props ){

        const label = props[ i ];
        document.getElementById( label ).innerHTML = labelName[i] + ": " + session[label];

    }

    document.getElementById( "userInfo" ).style.display = "flex";
}