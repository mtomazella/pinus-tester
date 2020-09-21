const express = require( 'express' );
const app = express();
const { serverPort } = require( './config/SERVERconfig.json' )

app.use( express.static( 'src' ) );

app.get( '/', ( request, response ) => {
    response.sendFile( `${__dirname}/src/html/index.html` );
} )

app.listen( serverPort );
