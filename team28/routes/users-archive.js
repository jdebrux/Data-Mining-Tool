var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  // Check user is logged in before allowing access to users page.
  if(req.session.firstname == undefined){return res.redirect('/login')}
  let options = {
    title : 'Users Archive',
    // Passing the session allows access to all of the session variables.
    // This is instead of including them all individually for every route.
    session : req.session
  };
  
  console.log(options);
  res.render('users-archive', options);
});

module.exports = router;
