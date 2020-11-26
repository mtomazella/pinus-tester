class RealTime {
    socket;
    user;

    constructor ( ) {
        return this;
    }

    get_id ( ) {
        return this.socket.id;
    }

    start ( url = 'http://localhost:3305', userType ) {
        const socket    = io( url );
        this.user       = { id: userId.value, type: userType }

        socket.emit( 'setSocket', { type: userType, id: userId.value } )

        socket.on( 'message', ( message ) => {
            new Men( message ).show();
        } )
        socket.on( 'supportConnect', ( info ) => {
            console.log( info )
        } )
        socket.on( 'supportDisconnect', ( info ) => {
            console.log( info )
        } )
        
        if ( userType == 'admin' ){
            socket.on( 'supportRequest', ( request ) => {
                console.log( request );
            } )
            socket.on( 'supportQueue', ( queue ) => {
                console.log( queue );
            } )
        }

        this.socket = socket;
    }

    supportRequest ( ) {
        if ( this.user.type == 'user' ) this.socket.emit( 'supportRequest' )
    }

    supportQueue ( ) {
        if ( this.user.type == 'admin' ) this.socket.emit( 'supportQueue' )
    }
}