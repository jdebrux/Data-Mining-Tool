const { response } = require('express');
var express = require('express');
var router = express.Router();
var conn = require('../dbcredentials/dbconfig.js');


router.get('/', function(req, res, next){
  // Check user is logged in before allowing access to users page.
  if(req.session.firstname == undefined){return res.redirect('/login')}

  let options = {
    title : 'Software',
    session : req.session
  };

  console.log(options);

  var employeeQuery='SELECT * FROM Software';
  conn.query(employeeQuery, (err, result) => {
    if(err){
      console.log("SQL error");
    }
    else {
      console.log("Software Query Success!");
      console.log(result);
      options.softwareData = result;
      res.render('software', options);
    }
  });
});

module.exports = router;