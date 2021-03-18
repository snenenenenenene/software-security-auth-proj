var mysql=require('mysql');
 var connection=mysql.createConnection({
   host:'sql11.freesqldatabase.com',
   user:'sql11399913',
   password:'5gKshZ8qHT',
   database:'sql11399913',
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
