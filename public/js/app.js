
function checkPassword(inputtxt) 
{ 
var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
if(inputtxt.match(passw)) 
{ 
    console.log("password ok");
passwordHandler = document.getElementById("passwordHandler").innerText;
passwordHandler = "Password is OK"
}
else
{ 
    console.log("password not ok");
passwordHandler = document.getElementById("passwordHandler").innerText;
passwordHandler = "Input Password and Submit [6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter]"    
}
}

function login() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    checkPassword(password);
    console.log(email + " " + password);


}
