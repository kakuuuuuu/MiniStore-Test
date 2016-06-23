var mongoose = require('mongoose');
var Product = mongoose.model('Product');
module.exports = {
  index: function(req, res){
    Product.find({},function(err, products){
      if(err){
        res.json(err)
      }
      else{
        res.json(products)
      }
    })
  },
  create: function(req, res){
    Product.findOne({name: req.body.name}, function(err, product){
      if(err){
        res.json({error: 'Error Checking Database'});
      }
      else if(product){
        res.json({error:{errors:{name:{message:'Product already exists'}}}});
      }
      else{
        var product = new Product(req.body)
        product.save(function(err){
          if(err){
            res.json({error: err})
          }
          else{
            console.log('Success')
            res.json(product);
          }
        })
      }
    })
  },
  reduce: function(req, res){
    Product.findOne({_id: req.body._product}, function(err, product){
      console.log('one')
      if(err){
        console.log('here')
        res.json({error:'Could not find product'})
      }
      else{
        if(product.qty < req.body.qty){
          res.json({error:'Not enough in stock'})
        }
        else{
          Product.update({_id: req.body._product}, {$inc: {qty: -req.body.qty}}, function(err){
            console.log('two')
            if(err){
              res.json({error: 'Out of stock'})
            }
          })
        }
      }
    })
    // Product.findByIdAndUpdate(req.body._product, {$inc: {qty: -req.body.qty}}, function(err){
    //   if(err){
    //     res.json({error:'Out of stock'})
    //   }
    // })
  }
}
