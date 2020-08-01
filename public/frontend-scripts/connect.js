function connect(){

    const userType = typedd.options[typedd.selectedIndex].value;
    if ( userType == "user" )  postRequest( "/userLogin", { id: userId, type: userType } );
    else if ( userType == "admin" ) postRequest( "/adminLogin", { id: userId, type: userType } );

}