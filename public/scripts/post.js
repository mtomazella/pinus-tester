const input = document.getElementById( 'input' );

const posting = [ ];

function post( ){

    const newMen = new Men();

    newMen.owner = true;
    newMen.setText( input.value );
    input.value = "";
    newMen.posting = true;

    newMen.show();  
    posting.push( newMen );

}

$(document).ready(function() {
    $(window).keydown(function(event){
      if(event.keyCode == 13) {
        event.preventDefault();
        post();
        return true;
      }
    });
  });