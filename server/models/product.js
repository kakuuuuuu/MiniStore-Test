var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ProductSchema = new mongoose.Schema({
  name: {type: String, required: [true, 'Name field cannot be empty'], minlength: [3,'Name field must be at least 3 characters']},
  url: {type: String, required: [true, 'Url field cannot be empty']},
  description: {type: String},
  qty: {type: Number, required: true, min: 0},
})
mongoose.model('Product', ProductSchema);
