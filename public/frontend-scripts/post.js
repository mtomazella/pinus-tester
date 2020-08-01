$(document).ready(function() {
  $(window).keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      post();
      return true;
    }
  });
});


const postRequest = ( url, dataObj, responseFunc, errorFunc ) => {

  /* Preparando mensagem */

  const data = JSON.stringify( dataObj );
  const request =  new XMLHttpRequest();

  request.onerror = ( url, dataObj, callback = undefined ) => {

    console.log( "reenviando mensagem: " + newMen );
    postRequest( url, dataObj );

  }

  request.open( 'POST', url, true);
  request.setRequestHeader( "Content-type", "application/json" );
  if (data != undefined) request.send( data ); //Enviando mensagem

  /* Recebando resposta para a mensagem */

  if ( !errorFunc ){
    request.onerror = function( ) {
      console.log( "Erro no envio da mensagem. Reenviando..." );
      postRequest( url, dataObj, responseFunc, errorFunc );
    }
  }
  else request.onerror = errorFunc(request);


  request.onreadystatechange = function () {
    if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
      if ( !responseFunc ){
        try{
          const response = JSON.parse(request.responseText);
          console.log(response);
          return response;
        }
        catch{
          console.log(request.responseText);
          return request.responseText;
        }
      }
      else responseFunc( request );
    }
  };

}


function post( ){

  const newMen = new Men();
  mens.push( newMen );
  const id = mens.length;

  newMen.owner = true;
  newMen.userType = typedd.options[typedd.selectedIndex].value;
  newMen.user = userId.value;
  //newMen.admim = document.getElementById("adminCode").value;

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

  postRequest( "/chatPost", newMen, function( request ){

    const response = JSON.parse(request.responseText);
    console.log(response);
    newMen.datetime = response.date;

  }, undefined ); 

  /* ------------- */

  return 0;
}