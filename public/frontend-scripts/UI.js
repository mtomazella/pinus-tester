$(document).ready(function () {
  minChat.style.display = "none";
  maxChat.style.display = "block";
  conx.style.display = "none";
  $(window).keydown(function (event) {
    if (event.keyCode == 13) {
      event.preventDefault();
      post();
      return true;
    }
  });
});

/* Component classes */

class ChatWindow {
  constructor(destination) {
    this.userType = destination.type;
    this.userId = destination.id;
    this.name = destination.name;
    return this;
  }
  /*show( ){
        //body.innerHTML += '<div class="bordinha" name="chat" data-desType="'+this.destination.type+'" data-desId="'+this.destination.id+'"><div class="botoes"><i class="fa fa-window-minimize icon" aria-hidden="true" onclick=" hide() "></i><i class="fas fa-window-maximize icon"></i><i class="fa fa-times icon" aria-hidden="true"></i></div><div class="col-12 chat" id="chat"></div> <div class="col-12 write"><form class="write row" autocomplete="off"><input autocomplete="false" name="hidden" type="text" style="display:none;"><input type="text" class="write badge-pill px-3" autocapitalize="on" autocomplete="off" name="input" id="input"><button type="button" class="send rounded rounded-circle" name="send" onclick="post()"> <i class="fa fa-location-arrow icon send" aria-hidden="true"></i> </button></form></div></div>'    
    }*/
}

/* UI functions */

function show() {
  minChat.style.display = "none";
  maxChat.style.display = "block";
}

function hide() {
  minChat.style.display = "block";
  maxChat.style.display = "none";
}

function conxUI() {
  let display = conx.style.display;

  if (display == "none") conx.style.display = "flex";
  else conx.style.display = "none";
}

function setUserInfo() {
  if (session["email"] == undefined) {
    document.getElementById("userInfo").style.display = "none";
    alert(
      "Usuário não encontrado. Cadastre este usuário ou contate o suporte."
    );
    return;
  }
  const props = ["displayName", "name", "email", "id"];
  const labelName = ["DName", "Name", "E-mail", "Id"];
  for (let i in props) {
    const label = props[i];
    document.getElementById(label).innerHTML =
      labelName[i] + ": " + session[label];
  }
  document.getElementById("userInfo").style.display = "flex";
}
