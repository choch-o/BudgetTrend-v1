var Budget = require('../models/Budget');
var UserStudy = require('../models/UserStudy');

exports.saveSelectedPrograms = function(req, res, next) {
  console.log("save post req");
  console.log(req.body);

  var promises = req.body.programs.map(function (program) {
  // for (var i = 0; i < req.body.length; i++) {
  //   var program = req.body[i]
    Budget.findOne({ label: program.label }, function(err, budget) {
      if (budget) {
        budget.count = budget.count + 1;
        budget.save(function (err, updateBudget) {
          if (err) return handleError(err);
        });
      } else {
        console.log("req body i");
        console.log(program);
        budget = new Budget({
          label: program.label,
          value: program.value,
          count: 1
        });
        budget.save(function(err) {
          console.log(err);
        });
      }
    });
  });
  var testset = new UserStudy({
    programs: req.body.programs
  });
  testset.save(function(err) {
    console.log(err);
  });
  Promise.all(promises)
    .then(function() { console.log('all saved'); })
    .catch(console.error);
  res.send({ok: "OK"});
}

exports.getPopularTags = function(req, res, next) {
  console.log("GET REQUEST RECEIVED")
  console.log(req.body)
  Budget.find({})
    .sort({ count: -1 })
    .limit(10)
    .exec(function(err, tags) {
      res.send(tags); 
    });
}
