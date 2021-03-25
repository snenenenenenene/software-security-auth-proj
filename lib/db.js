var mysql=require('mysql');
 var connection=mysql.createConnection({
   host:'sql11.freesqldatabase.com',
   user:'sql11401519',
   password:'MEUQMaa8nx',
   database:'sql11401519',
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
