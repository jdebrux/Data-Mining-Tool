var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
  // Check user is logged in before allowing access to users page.
  if(req.session.firstname == undefined){return res.redirect('/login')}

  let options = {
    title : 'Current Problems',
    session : req.session
  };

  console.log(options);
  res.render('current-problems', options);
});

module.exports = router;