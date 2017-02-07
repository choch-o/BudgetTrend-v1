var mongoose = require('mongoose');

var userStudySchema = new mongoose.Schema({
  budgets: [{
    label: String,
    value: Number
  }],
  numBudgets: Number
});

var UserStudy = mongoose.model('UserStudy', userStudySchema);

module.exports = UserStudy;
