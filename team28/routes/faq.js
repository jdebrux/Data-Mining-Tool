var express = require('express');
var router = express.Router();
var conn = require('../dbcredentials/dbconfig.js');

var sql = "SELECT * FROM Software";
/* GET home page. */
router.get('/', function(req, res, next) {

  // Check user is logged in before allowing access to users page.
  if(req.session.firstname == undefined){return res.redirect('/login')}

  let options = {
    title : 'FAQ',
    session : req.session
  }

  // conn.query(sql, function(err, result) {
  //   if(err){
  //     options.title = 'Express with no data :(';
  //     options.data = '';
  //   }
  //   else {
  //     options.title = 'Express with data!!!';
  //     options.data = result;
  //   }
  // });

  console.log(options);
  res.render('faq', options);

});

router.get('/', function(req, res) {
  res.send('Some text');
});

module.exports = router;
