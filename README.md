# SoftwareSecurity

### sourcecode: https://github.com/snenne/SoftwareSecurity
### url of hosted website: https://softwaresecurity-app.herokuapp.com/

## SUMMARY

This is the final project for the course Software Security.
For said course we had to create a web application that introduces a self-made authentic login and registering mechanism.
The registering mechanism disables users to check in with a vulnerable password by chcking the **HIBP** (Have I been Pwned) API. 

After a user has been registered, aforementioned user will be able to use his credentials to log in to the web application.
After doing so, the user will be greeted by the homepage of the website wich is frankly quite lackluster, but it was not part of the requirements nor the scope of our project.

## TOOLS + WHY

### PasswordValidator 
{https://stackoverflow.com/questions/34760548/how-to-validate-password-using-express-validator-npm}

We could've used some form of regex validation instead of this package but since this fit our requirements perfectly and because of its modularity we ended up going with this npm package to validate the integrity of new passwords. 

```js
var schema = new passwordValidator();

schema
.is().min(8)
.is().max(100)
.has().uppercase()
.has().lowercase()
.has().digits(2)
.has().not().spaces()
```

### JS-Sha1

To protect user credentials the HIPB API only allows for the first 5 sha-encrypted characters of a password to be used in order to check whether said password has been "PWNED". Hence we installed and used an npm package which - in a self-explanatory manner - is named js-sha-1. 

```js
var sha = sha1(password).toUpperCase();
var prefix = sha.substring(0, 5);
var suffix = sha.substring(5, sha.length);   
```

### Axios

In succession to the aforementioned password validation and sha-encryption we have actually check in with the HIBP API. We do this by sending a GET-request - through an npm package that goes by the name axios - to said API and appending the output of the sha-function to the API url: {https://api.pwnedpasswords.com/range/{sha-password}.

```js
axios({
        method: 'get',
        url: 'https://api.pwnedpasswords.com/range/' + prefix,
    })
    .then(response => {
      //response code
    }
```
### Bcrypt

To encrypt, salt and decrypt the plaintext passwords and passwords stored in the database respectively we opted for the popular yet secure npm package bcrypt.
From what it seemed it looked like bcrypt is a big player in the hashing/salting scene and since it fit in perfectly with the scope of this project we did not hesitate to tie this package in with the rest of our application.


## ROADMAP

We first started by the HIBP section of the backend since that seemed to be the most confronting part of this whole exercise. 
Since this was in the mere beginning of the exercise we implemented it by using jquery's ajax function. However, when our project started growing in size and complexity due to the addition of a connection between the back- and frontend in order to check and test actual passwords we decided that it'd be better if we switched to an express app since that's what we've been familiarised with.
After refactoring the code a couple of times we started writing the routes for our authorisation function.
Then we had to create a connection with a mysql database in order to GET and POST the users. After lots of trial and error we added a seperate ./lib/db.js file that uses the homonymous npm package.
When this was done we needed to look for a host for both our database and website. 
We ended up using freesqldbhosting.com and heroku respectively.

## DIFFICULTIES

One of the main difficulties was doing this whole operation without having an analysis document to hold on to.
As well as hosting a database. Since we didn't want to taint our AWS accounts that we were using for a different subject (ICT-Architecture) and since we couldn't extensively test Azure due to its price we ended up having to look for a different and quite frankly sketchier database hosting website. In an actual production environment we would obviously never do this but due to not having the means necessary we had to look elsewhere.

## REFERENCES

https://stackoverflow.com/questions/34760548/how-to-validate-password-using-express-validator-npm

https://ourcodeworld.com/articles/read/258/how-to-connect-to-a-mysql-database-with-node-js

https://haveibeenpwned.com/API/v2

## CONCLUSION

This project has helped us understand authentication by having us utilise a hands-on approach. By using the theory seen in class it became clear what all the different concepts and notions really meant in a pragmatic sense. 
