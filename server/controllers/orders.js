var mongoose = require('mongoose');
var Order = mongoose.model('Order');
module.exports = {
  index: function(req, res){
    Order.find({}).populate('_customer').populate('_product')
      .exec(function(err, posts){
        if(err){
          res.json(err);
        }
        else{
          res.json(posts);
        }
      })
  },
  create: function(req, res){
    var order = new Order(req.body)
    order.save(function(err){
      if(err){
        console.log(err)
        res.json(err);
      }
      else{
        console.log('Success')
        res.json(order);
      }
    })
  },
  destroy: function(req, res){
    Order.remove({_id: req.params.id}, function(err){
      if(err){
        res.json(err)
      }
      else{
        res.redirect('/')
      }
    })
  }
}
