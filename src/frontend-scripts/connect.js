const APIurl = 'http://localhost:3305';

function GETrequest ( url, route, query = '', funcComp, funcErr ) {
    const request = new XMLHttpRequest();
    if ( query != '' ) query = '?'+query;
    request.open( 'GET', `${url}/${route}${query}`, true );
    request.send( null );
    
    request.onreadystatechange = funcComp( request.responseText );
}

GETrequest( APIurl, 'user', undefined, ( result ) => {
    console.log( result );
}, ( ) => {
    console.log( 'Deu erro fiote' )
} );