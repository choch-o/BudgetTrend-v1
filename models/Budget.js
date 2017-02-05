var mongoose = require('mongoose');

var budgetSchema = new mongoose.Schema({
  name: String,
  value: Number,
  count: Number
});

var Budget = mongoose.model('Budget', budgetSchema);

module.exports = Budget;
