let session;

function onreadyUserLogin( request ){

    const response = JSON.parse( request.responseText );
    session = response;
    setUserInfo();
}

function connect(){

    const userType = typedd.options[typedd.selectedIndex].value;
    if ( userType == "user" ) { postRequest( "/userLogin", { id: userId.value, type: userType }, onreadyUserLogin ); }
    else if ( userType == "admin" ) postRequest( "/adminLogin", { id: userId.value, type: userType }, onreadyUserLogin );
}

function setUserInfo( ){

    //console.log(session);

    const props = [ "displayName", "name", "email", "idUser" ];
    const labelName = [ "DName", "Name", "E-mail", "Id" ];

    for ( let i in props ){

        const label = props[ i ];
        document.getElementById( label ).innerHTML = labelName[i] + ": " + session[label];

    }

    document.getElementById( "userInfo" ).style.display = "flex";
}