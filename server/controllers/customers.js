var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');
module.exports = {
  index: function(req, res){
    Customer.find({}, function(err, customers){
      if(err){
        res.json(err);
      }
      else{
        res.json(customers);
      }
    })
  },
  create: function(req, res){
    Customer.findOne({name: req.body.name}, function(err, customer){
      console.log(customer);
      if(err){
        res.json(err)
      }
      else if(customer){

        res.json({error:{errors:{name:{message:'Customer already exists'}}}})
      }
      else{
        var customer = new Customer(req.body)
        customer.save(function(err){
          if(err){
            console.log(err)
            res.json({error:err});
          }
          else{
            console.log('Success')
            res.json(customer);
          }
        })
      }
    })
  },
  destroy: function(req, res){
    Customer.remove({ _id: req.params.id},function(err){
      if(err){
        res.json(err)
      }
      else{
        res.redirect('/')
      }
    })
  }
}
