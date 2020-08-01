let session;

function connect(){

    const userType = typedd.options[typedd.selectedIndex].value;
    if ( userType == "user" ) { postRequest( "/userLogin", { id: userId.value, type: userType } ); }
    else if ( userType == "admin" ) postRequest( "/adminLogin", { id: userId.value, type: userType } );

    setUserInfo();
}

function setUserInfo( ){

    console.log(session)

    for ( let i in session ){

        console.log("etstetfe")

        /*const label = session[ i ];
        if ( label != "password" ) document.getElementById( session[ i ] ).innerHTML = label+": "+label[0];

        console.log( label );
        console.log( label[0] );*/

    }

}