var mongoose = require('mongoose');
var CustomerSchema = new mongoose.Schema({
  name: {type: String, required: [true, 'Name field cannot be empty'], minlength: [3, 'Name cannot be less than 3 characters']},
  date: {type: Date}
})
mongoose.model('Customer', CustomerSchema);
