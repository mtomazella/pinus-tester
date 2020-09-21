class Men {
    constructor ( id, idAdmin, idUser, datetime, sender, type, text, image ){
        this.id         = id;
        this.idAdmin    = idAdmin;
        this.idUser     = idUser;
        this.datetime   = datetime;
        this.sender     = sender;
        this.type       = type;
        this.text       = text;
        this.image      = image;  
        return this;
    }
    show ( ){
        const owner = 'owner';
        chat.innerHTML += `<div class="message ${owner}">${this.text}</div>`;
    }
}

function teste ( quant ){
    const mens = [ ];
    for ( let i = 0; i < quant; i++ ){
        mens.push( new Men() );
        mens[i].show()
    }
}
teste( 20 )


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