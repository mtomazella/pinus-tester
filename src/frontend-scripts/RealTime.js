class RealTime {
    socket;
    user = { };
    otherUserInfo = { socketId: '' };
    supportQueueObj = { };

    constructor ( ) {
        return this;
    }

    get_id ( ) {
        return this.socket.id;
    }

    start ( url = 'http://localhost:3305', userType ) {
        const socket    = io( url );
        this.user       = { id: session.id, type: session.type }

        socket.emit( 'setSocket', { type: session.type, id: session.id } )

        socket.on( 'message', ( message ) => {
            const newMessage = new Men( message );
            newMessage.show();
        } )
        socket.on( 'messageLoad', ( messages ) => {
            messages.forEach( ( message ) => {
                const newMessage = new Men( message );
                newMessage.show();
            } )
        } )
        socket.on( 'repportError', ( error ) => {
            console.log( error );
        } )
        socket.on( 'supportDisconnect', ( info ) => {
            if ( info.otherUserInfo.socketId === this.otherUserInfo.socketId ) this.otherUserInfo = { };
            chat.innerHTML = '';
        } )
        
        if ( userType == 'admin' ){
            socket.on( 'supportRequest', ( request ) => {
                console.log( request );
            } )
            socket.on( 'supportQueue', ( queue ) => {
                for ( let i in typedd.options.length-1 ) {
                    typedd.remove( i );
                }
                queue.forEach( element => {
                    this.supportQueueObj[ element.userId ] = element;
                    const option = document.createElement( 'option' );
                    option.text = element.userId;
                    option.value = element.socketId;
                    supportQueueSelector.add( option );
                });
            } )
        } else {
            socket.on( 'supportConnect', ( info ) => {
                console.log( info )
                if ( info.user.socketId == this.socket.id ) this.otherUserInfo = { socketId: info.support.socketId, userId: info.support.supportId };
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

    supportConnect ( userInfo ) {
        this.otherUserInfo = userInfo;
        if ( this.user.type == 'admin' ) this.socket.emit( 'supportConnect', userInfo )
    }

    supportDisconnect ( ) {
        console.log( this.otherUserInfo )
        this.socket.emit( 'supportDisconnect', { otherUserInfo: this.otherUserInfo, userInfo: { userId: this.user.id, socketId: this.socket.id } } )
        console.log( { otherUserInfo: this.otherUserInfo, userInfo: this.user } )
        this.otherUserInfo = { };
        chat.innerHTML = '';
    }

    message ( message ) {
        const messageObj = message.extractInfo();
        this.socket.emit( 'message', { message: messageObj, otherSocketId: this.otherUserInfo.socketId } );
    }
}