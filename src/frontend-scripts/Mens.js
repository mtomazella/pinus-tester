class Men {
    constructor ( message ){
        //this.id         = message.id;
        this.idAdmin    = message.idAdmin;
        this.idUser     = message.idUser;
        this.datetime   = message.datetime;
        this.sender     = message.sender;
        this.type       = message.type;
        this.text       = message.text;
        this.image      = message.image;  
        return this;
    }
    show ( ){
        let owner = 'owner';
        if ( realTime.user.type ) owner = ( realTime.user.type == this.sender ) ? 'owner' : '';
        chat.innerHTML += `<div class="message ${owner}">${this.text}</div>`;
    }
    extractInfo ( ) {
        return {    idAdmin: this.idAdmin,
                    idUser: this.idUser,
                    datetime: this.datetime,
                    sender: this.sender,
                    type: this.type,
                    text: this.text,
                    image: this.image
                }
    }
}

function teste ( quant ){
    const mens = [ ];
    for ( let i = 0; i < quant; i++ ){
        mens.push( new Men() );
        mens[i].show()
    }
}
//teste( 20 )


/*
[
  {
    "id": 1,
    "idAdmin": 3,
    "idUser": 16,
    "datetime": "2020-08-27T04:45:03.000Z",
    "sender": "admin",
    "type": "text",
    "text": "testeMsg1",
    "image": null
  }
]
*/