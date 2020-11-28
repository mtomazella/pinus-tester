function connect ( ) {
    const userType = typedd.options[typedd.selectedIndex].value;
    GETrequest( APIurl, userType, `id=${userId.value}`, ( user ) => {
        if ( !user[0] ) {
            alert( 'Usuário não existe' );
            return;
        }
        session = user[0];
        if ( userType === 'admin' ) debug.style.display = 'flex';
        setUserInfo( );
        realTime.start( APIurl, userType );
        realTime.supportRequest();
    } )
}

/* Functions */

function GETrequest ( url, route, query = '', funcComp, funcErr ) {
    const request = new XMLHttpRequest();
    if ( query != '' ) query = '?'+query;
    console.log( `${url}/${route}${query}` )
    request.open( 'GET', `${url}/${route}${query}`, true );
    request.send( null );
    
    request.onreadystatechange = ( ) => {
        if (request.readyState == 4 && request.status == 200)
            funcComp( JSON.parse( request.responseText ) );
    } 

    request.onerror = ( ) => {
        console.log( JSON.parse( request.responseText ) )
    }
}

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