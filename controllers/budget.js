var Budget = require('../models/Budget');

exports.saveSelectedPrograms = function(req, res, next) {
  console.log("save post req");
  console.log(req.body);

  var promises = req.body.map(function (program) {
  // for (var i = 0; i < req.body.length; i++) {
  //   var program = req.body[i]
    Budget.findOne({ name: program.name }, function(err, budget) {
      if (budget) {
        budget.count = budget.count + 1;
        budget.save(function (err, updateBudget) {
          if (err) return handleError(err);
        });
      } else {
        console.log("req body i");
        console.log(program);
        budget = new Budget({
          name: program.name,
          value: program.value,
          count: 1
        });
        budget.save(function(err) {
        });
      }
    });
  });
  Promise.all(promises)
    .then(function() { console.log('all saved'); })
    .catch(console.error);
  res.send({ok: "OK"});
}
