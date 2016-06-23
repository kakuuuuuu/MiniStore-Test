var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var OrderSchema = new mongoose.Schema({
  _customer: {type: Schema.Types.ObjectId, ref: 'Customer'},
  _product: {type: Schema.Types.ObjectId, ref: 'Product'},
  qty: {type: Number, required: true},
  date: {type: Date}
})
mongoose.model('Order', OrderSchema);
