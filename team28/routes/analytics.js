var express = require('express');
var router = express.Router();
var conn = require('../dbcredentials/dbconfig.js');


router.get('/', function(req, res, next){
  // Check user is logged in before allowing access to users page.
  if(req.session.firstname == undefined){return res.redirect('/login')}
  if(req.session.DeptID == 2){return res.redirect('/login')}

  let options = {
    title : 'Analytics',
    session : req.session
  };


  let sqlGetTotalTickets = "SELECT Status as states, Count(TicketID) as numberOfTicketStates FROM Ticket GROUP BY Status";
  conn.query(sqlGetTotalTickets, (err, result) => {
    if(err){
      console.log("SQL error");
    }
    else {
      console.log(result);
      options.totalTickets = result;
    }
  });

  let sqlTotalProblems = "SELECT ProblemTypes.ProblemTag AS Problem, COUNT(ProblemTypes.ProblemTypeID) AS NumProblems FROM ProblemTypes, TicketProblems WHERE TicketProblems.ProblemTypeID = ProblemTypes.ProblemTypeID GROUP BY ProblemTypes.ProblemTag";
  conn.query(sqlTotalProblems, (err, result) => {
    if(err){
      console.log("SQL error");
    }
    else {
      console.log(result);
      options.totalProblems = result;
    }
  });
  res.render('analytics', options);
});

module.exports = router;