const mens = [ ];

class Men{

    constructor( ){

        this.text = undefined;
        this.owner = undefined;

        return this;
    }

    setText( text ){

        this.text = text;

    }

    show( ){

        mens.push( this );
        let owner = "";
        if ( this.owner ) owner = "owner";

        chat.innerHTML += " <div class='message " + owner + " ' id=' msg" + mens.length + " '> " + this.text + " </div>"

        setInterval(()=>{
            document.querySelector("#chat").scrollTop=10000;
        }, 500);
    }

}