var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var dan = mongoose.model('Dan');


/* GET home page. */
router.get('/:id', function(req, res, next) {
		res.render('filter-admin');

  
});



router.get('/:filter',function(req,res){
  var chose_category = false;
  var chosen;
  var chose_brand = false;
  var category_list = ['Grand Piano','Upright Piano','Piano Giá Rẻ','Đàn Piano Điện','Piano Điện Yamaha','Đàn Organ','Khác' ];
  var brand_list = ['Yamaha','KaWai','Rolland','Casio','Colombia','Techinics','Korg','Khác'];
//Check chosen ???
for(var i=0;i<category_list.length;i++){
  if(req.params.filter == category_list[i]){
        chose_category = true;
        chosen = category_list[i];
  }
  else if(req.params.filter == brand_list[i]){
        chose_brand = true;
        chosen = brand_list[i];
  }
}

if(chose_category == true){
      var d = dan.find({category: chosen},function(err,d){
        if(err) console.error(err);
        else{
          res.render('filter-admin',{dan: d,chosen: chosen});
        }
        
  });
}
else if(chose_brand == true){
  var d = dan.find({brand: chosen},function(err,d){
        if(err) console.error(err);
        else{
          res.render('filter-admin',{dan: d,chosen: chosen});
        }
        
  });
}

  
    
});




module.exports = router;
