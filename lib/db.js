var mysql=require('mysql');
 var connection=mysql.createConnection({
   host:'sql11.freesqldatabase.com',
   user:'sql11402784',
   password:'AVCJL55BEG',
   database:'sql11402784',
   port: 3306,
 });
connection.connect(function(error){
   if(!!error){
     console.log(error);
   }else{
     console.log('Connected to database...');
   }
 });  
module.exports = connection; 
