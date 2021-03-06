function register(){
    var vEmail = document.getElementById("email").value;
    var vPassword = document.getElementById("password").value;
    checkPassword(vPassword);
    console.log(vEmail + " " + vPassword);
    var newUser = {email: vEmail,password: vPassword}
    $.getJSON("data/users.json", function(data){
        data.users.push(newUser);
        console.log("pushed...");
        
})
}

function checkUser(email, password) { 
var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
if(password.match(passw)) 
{ 
    var sha = sha1($("#password").val()).toUpperCase();
    console.log(sha);
    var prefix = sha.substring(0, 5);
    console.log(prefix);
    var suffix = sha.substring(5, sha.length);
    console.log(suffix); 


    $.ajax({
        url: "https://api.pwnedpasswords.com/range/" + prefix
    }).done(function(response) {
            var hashes = response.split('\n');
            var breached = false;

        for (let i = 0; i < hashes.length; i++) {
            var hash = hashes[i];
            var h = hash.split(':');

            if (h[0] === suffix) {
                $("#result").html("The password has been breached " + h[1] + "times.");
                breached = true;
                break;
            }
        }

        if (!breached) {
            console.log("The password has not been breached.")
        }
    });
} else
    { 
        $("#result").html("This password is not valid")
    }
}

function checkPassword(inputtxt) { 
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if(inputtxt.match(passw)) 
    { 
        var sha = sha1($("#password").val()).toUpperCase();
        console.log(sha);
        var prefix = sha.substring(0, 5);
        console.log(prefix);
        var suffix = sha.substring(5, sha.length);
        console.log(suffix); 
    
    
        $.ajax({
            url: "https://api.pwnedpasswords.com/range/" + prefix
        }).done(function(response) {
                var hashes = response.split('\n');
                var breached = false;
    
            for (let i = 0; i < hashes.length; i++) {
                var hash = hashes[i];
                var h = hash.split(':');
    
                if (h[0] === suffix) {
                    $("#result").html("The password has been breached " + h[1] + "times.");
                    breached = true;
                    break;
                }
            }
    
            if (!breached) {
                console.log("The password has not been breached.")
                //window.location.href = "/homepage"
            }
        });
    } else
        { 
            $("#result").html("This password is not valid")
        }
    }
function login(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    checkUser(email, password);
    console.log(email + " " + password);
    $.getJSON("data/users.json", function(data){
        console.log(data);
        console.log(data.users[0].email); // Prints: Harry
        console.log(data.users[0].password); // Prints: 14
    }).fail(function(){
        console.log("An error has occurred.");
    });
    //window.location.href = "/homepage"
}


