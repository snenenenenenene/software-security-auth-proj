var express = require('express');
var router = express.Router();
var connection  = require('../lib/db');
const axios = require('axios');
var sha1 = require('js-sha1');
var passwordValidator = require('password-validator');

var schema = new passwordValidator();

schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces


router.post('/authentication', function(req, res, next) {
    
    var name = req.body.email;   
    var email = req.body.email;
    var password = req.body.password;
    var shaPassword = sha1(password);

        connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, shaPassword], function(err, result, fields) {
            if(err) throw err
            if (result.length <= 0) {
                req.flash('error', 'Please enter correct email and Password!')
                res.redirect('/login')
            }
            else { 
                req.session.loggedin = true;
                req.session.name = name;
                res.redirect('/home');
 
            }            
        })
  
})

router.post('/register', function(req, res, next) {
    
    var name = req.body.email;   
    var email = req.body.email;
    var password = req.body.password;
    var shaPassword = sha1(password);

    if (email != "" && password != ""){

    connection.query('SELECT * FROM users WHERE email = ?', [email], function(err, result, fields) {
    if(err) throw err
    if (result.length > 0) {
         req.flash('error', 'This email has already been registered!')
         res.redirect('/register');
    }
    else {
        var sha = sha1(password).toUpperCase();
        var prefix = sha.substring(0, 5);
        var suffix = sha.substring(5, sha.length);    
        if(schema.validate(password)){ 
        
        axios({
            method: 'get',
            url: 'https://api.pwnedpasswords.com/range/' + prefix,
        })
        .then(response => {
            console.log(response.data);
            var hashes = response.data.split('\n');
            var breached = false;
            
            for (let i = 0; i < hashes.length; i++) {
                var hash = hashes[i];
                var h = hash.split(':');
    
                if (h[0] === suffix) {
                    breached = true;
                    req.flash('error', "The password has been breached " + h[1] + "times.")
                    res.redirect('/register');
                }
            }
            if (!breached) {
                connection.query('INSERT INTO users (name, password, email) VALUES (?, ?, ?)', [email, shaPassword, email], function() {
                    if (err) console.log(error);
                    
                    req.session.loggedin = true;
                        req.session.name = name;
                        res.redirect('/home');
                })  
            }
        })
        .catch(error => {
            console.log(error);
        }); 
        } else {
            req.flash('error', "Password must be 8 letters, have 1 uppercase letter, 2 numbers");
            res.redirect('/register');
        }}            
})
} else {
    req.flash('error', "Enter valid credentials!")
    res.redirect('/register');
}
})



router.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/login');
  });

module.exports = router;
