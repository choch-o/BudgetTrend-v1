var mongoose = require('mongoose');

var schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
};
var promiseSchema = new mongoose.Schema({
}, schemaOptions);
