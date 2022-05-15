var express = require('express');
var router = express.Router();
var conn = require('../dbcredentials/dbconfig.js');

/* GET login listing. */
router.get('/', function(req, res, next) {
  // User must login again whenever this page is accessed.

  delete req.session.firstname;
  delete req.session.DeptID;
  
  let options = {
    title : 'Login',
    session : req.session
  }
  
  // Render the webpage.
  console.log(options);
  res.render('login', options);
});

// Post request with the details from the login form.
router.post('/', (req,res) => {

  let username = req.body.username;
  let password = req.body.password;
  let loginQuery = "SELECT Email, PasswordHash, DeptID, FirstName FROM Employees WHERE Email = '" + username + "' AND PasswordHash = '" + password +"'";
  conn.query(loginQuery, (err, result) => {
    if(err){
      console.log("SQL error");
    }
    else if (result.length > 1){
      console.log("There are multiple accounts with those details, please contact your system administrator.");
    }
    else if (result.length == 0){
      console.log("Username or password incorrect");
      if (req.session.loginAttempts == undefined){
        req.session.loginAttempts = 1;
      }
      else{
        req.session.loginAttempts ++;
      }
      res.redirect('login');
    }
    else {
      console.log("Credentials verified, login successful!");
      delete req.session.loginAttempts;
      req.session.DeptID = result[0].DeptID;
      req.session.firstname = result[0].FirstName;
      console.log(req.session.firstname);
      switch(req.session.DeptID){
        case 8: // Administrator
          res.redirect('manage-users');
          break;
        case 7: // Specialist
        case 9: // External specialist
          res.redirect('current-problems');
          break;
        default: // Any other user
          res.redirect('faq');
      }
    }
  });
});

module.exports = router;
