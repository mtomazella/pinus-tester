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
        allMessages.unshift( this );
        return this;
    }
    show ( ){
        const owner = ( this.sender == session.userType ) ? 'owner' : '';
        chat.innerHTML += `<div class="message ${owner}">${this.text}</div>`;
        document.querySelector( "#chat" ).scrollTop = 10000;
    }
}


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