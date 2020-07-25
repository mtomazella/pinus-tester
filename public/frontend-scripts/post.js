$(document).ready(function() {
  $(window).keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      post();
      return true;
    }
  });
});

const input = document.getElementById( 'input' );

function post( ){

  const newMen = new Men();
  mens.push( newMen );
  const id = mens.length;

  newMen.owner = true;
  newMen.user = document.getElementById("userCode").value;
  newMen.admim = document.getElementById("adminCode").value;

  if( newMen.user == "" || newMen.admin == "" ) return 2;

  if ( !input.value.trim() ){
    input.value = "";
    return 1;
  } 

  newMen.setText( input.value );
  input.value = "";
  //newMen.posting = true;

  newMen.show();  


  /* Data Transfer */


  const postRequest = ( url, dataObj ) => {

    /* Preparando mensagem */

    const data = JSON.stringify( dataObj );
    const request =  new XMLHttpRequest();

    request.onerror = ( url, dataObj, callback = undefined ) => {

      console.log( "reenviando mensagem: " + newMen );
      postRequest( url, dataObj );

    }

    request.open( 'POST', url);
    request.setRequestHeader( "Content-type", "application/json" );
    request.send( data ); //Enviando mensagem

    /* Recebando resposta para a mensagem */

    request.onerror = function( ) {
      console.log( "Erro no envio da mensagem. Reenviando..." );
      postRequest( url, dataObj );
    }
    request.onreadystatechange = function () {
      if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
        const response = JSON.parse(request.responseText);
        console.log(response);
        newMen.datetime = response.date;
        //newMen.posting = false;
      }
    };

  }

  postRequest( "/chatPost", newMen ); 

  /* ------------- */

  return 0;
}