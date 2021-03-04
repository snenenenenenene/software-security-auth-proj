function login() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    checkPassword(password);
    console.log(email + " " + password);
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
            $("#result").html("The password has not been breached.")
        }
    });
} else
    { 
        $("#result").html("This password is not valid")
    }
}

