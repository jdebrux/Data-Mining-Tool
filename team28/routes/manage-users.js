const { response } = require('express');
var express = require('express');
var router = express.Router();
var conn = require('../dbcredentials/dbconfig.js');


router.get('/', function(req, res, next){
  // Check user is logged in before allowing access to users page.
  if(req.session.firstname == undefined){return res.redirect('/login')}

  let options = {
    title : 'Manage Users',
    session : req.session
  };

  console.log(options);
  //res.render('manage-users', options);

  var employeeQuery='SELECT * FROM Employees';
  conn.query(employeeQuery, (err, result) => {
    if(err){
      console.log("SQL error");
    }
    else {
      console.log("Employee Query Success!");
      console.log(result);
      options.userData = result;
    }
  });

  var problemTypeQuery='SELECT * FROM ProblemTypes';
  conn.query(problemTypeQuery, (err, result) => {
    if(err){
      console.log("SQL error");
    }
    else {
      console.log("Problem Type Query Success!");
      console.log(result);
      options.problemTypes = result;
      res.render('manage-users', options);
    }
  });
});

// Post request with the details from the edit user modal form.
router.post('/editUserDetails', (req,res) => {
  let userID = req.body.userID;
  let fname = req.body.fname;
  let surname = req.body.surname;
  let email = req.body.email;
  let telephone = req.body.telephone;
  let deptID = req.body.deptID;
  let sqlEditUser = "UPDATE Employees SET DeptID='"+deptID+"',FirstName='"+fname+"',Surname='"+surname+"',Email='"+email+"',Telephone='"+telephone+"' WHERE UserID = '"+userID+"';";
  console.log(sqlEditUser);
  conn.query(sqlEditUser, (err, result) => {
    if(err){
      console.log("SQL error");
    }
    else {
      console.log("Employee Query Success!");
      console.log(result);
    }
  });
  console.log(userID);
});

// // Post request with the details from the add user modal form.
router.post('/addNewUser', (req,res) => {
  let userID = req.body.userIDAdd;
  let fname = req.body.fnameAdd;
  let surname = req.body.surnameAdd;
  let email = req.body.emailAdd;
  let telephone = req.body.telephoneAdd;
  let deptID = req.body.deptIDAdd;
  let sqlAddUser = "INSERT INTO Employees (UserID,FirstName,Surname,Email,Telephone,DeptID) VALUES('"+userID+"','"+fname+"','"+surname+"','"+email+"','"+telephone+"','"+deptID+"');";
  console.log(sqlAddUser);
  conn.query(sqlAddUser, (err, result) => {
    if(err){
      console.log("SQL error");
    }
    else {
      console.log("Add Employee Query Success!");
      console.log(result);
    }
  });
  console.log(userID);
});

//Post request with the problem tags from the add user modal form.
router.post('/addProblemTags', (req,res) => {
  let userID = req.body.userIDAdd;
  arr = ['1','2','3'];
  arr.forEach(element => {
    let sqlAddProblemTag = "INSERT INTO Specialist (UserID,ProblemTypeID) VALUES ('"+userID+"','"+element+"');";
    console.log(sqlAddProblemTag);
    conn.query(sqlAddProblemTag, (err, result) => {
      if(err){
        console.log("SQL error");
      }
      else {
        console.log("Add ProblemTag Query Success!");
        console.log(result);
      }
    });
  });
});

//Post request with the details from the edit user modal form.
router.post('/removeUser', (req,res) => {
  let userID = req.body.userID;
  let sqlDeleteUser = "DELETE FROM Employees WHERE UserID = '"+userID+"';";
  console.log(sqlDeleteUser);
  conn.query(sqlDeleteUser, (err, result) => {
    if(err){
      console.log("SQL error");
    }
    else {
      console.log("Delete employee Query Success!");
      console.log(result);
    }
  });
  console.log(userID);
});

module.exports = router;