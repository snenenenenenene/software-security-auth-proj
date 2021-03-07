var express = require('express');
var router = express.Router();
var connection  = require('../lib/db');
 
router.get('/', function(req, res, next){    
    res.render('login', {
        title: 'Login',
        email: '',
        password: ''     
    })
})

router.get('/login', function(req, res, next){    
  res.render('login', {
      title: 'Login',
      email: '',
      password: ''     
  })
})
 
router.get('/register', function(req, res, next){    
    res.render('register', {
        title: 'Register',
        email: '',
        password: ''    
    })
})
 
router.get('/home', function(req, res, next) {
    if (req.session.loggedin) {
         
        res.render('home', {
            title:"Dashboard",
            name: req.session.name,     
        });
 
    } else {
        res.redirect('/register');
    }
});

 
module.exports = router;