function GETrequest ( url, route, query = '', funcComp, funcErr ) {
    const request = new XMLHttpRequest();
    if ( query != '' ) query = '?'+query;
    console.log( `${url}/${route}${query}` );
    request.open( 'GET', `${url}/${route}${query}`, true );
    request.setRequestHeader('Content-Type', 'application/json');
    request.send( null );
    
    request.onreadystatechange = ( ) => {
        if(request.readyState === XMLHttpRequest.DONE && request.status === 200)
            if ( funcComp != undefined ) funcComp( request );
            else console.log( JSON.parse( request.responseText ) );
        else if ( request.status >= 500 )
            if ( funcErr != undefined ) funcErr( request );
            else console.log( JSON.parse( request.responseText ) );
    }
    request.onerror = ( error ) => {
        console.log( error );
    }
}

function POSTrequest ( url, route, data, funcComp, funcErr ) {
    if ( data == undefined ) return;
    const request = new XMLHttpRequest( );
    request.open( 'POST', `${url}/${route}` );
    request.setRequestHeader('Content-Type', 'application/json');
    request.send( JSON.stringify( data ) );

    request.onreadystatechange = ( ) => {
        if(request.readyState === XMLHttpRequest.DONE && request.status === 200)
            if ( funcComp != undefined ) funcComp( request );
            else console.log( JSON.parse( request.responseText ) );
        else if ( request.status >= 500 )
            if ( funcErr != undefined ) funcErr( request );
            else console.log( JSON.parse( request.responseText ) );
    }
    request.onerror = ( error ) => {
        console.log( error );
    }
}