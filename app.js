var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs         = require('fs');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' })
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//mongoose
var mongoose = require('mongoose');
searchPlugin = require('mongoose-search-plugin');
mongoose.connect('mongodb://localhost/piano');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'loi ket noi:'));
db.once('open', function() {
  console.log('Kết nối dbs thành công!')
});

var danSchema = mongoose.Schema({
  dan_id: String,
  name: String,
  brand: String,
  brand_new: Boolean,
  last_price: Number,
  price: Number,
  product_code: String,
  category: String,
  origin: String,
  promotion: String,
  description: String,
  thumb: String,
  image: String,
  parameter: String,
});

var donHangSchema = mongoose.Schema({
  time: String,
  dan_id: String,
  name: String,
  code: String,
  kh_name: String,
  phone: Number,
  email: String,
  address: String
});

var userSchema = mongoose.Schema({
    user_id: Number,
    name: String,
    password: String,
    email: String
});


var saleSchema = mongoose.Schema({
    id: Number,
    name: String,
    content: String
});

var newsSchema = mongoose.Schema({
    name: String,
    content: String,
    image: String,
    author: String
});

var sale = mongoose.model('Sale',saleSchema);
var news = mongoose.model('News',newsSchema);

var user = mongoose.model('User',userSchema);

var donHang = mongoose.model('Don_Hang',donHangSchema);

var dan = mongoose.model('Dan',danSchema);


var routes = require('./routes/index');
var users = require('./routes/users');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//passport






app.use('/', routes);
app.use('/users', users);






app.get('/admin',function(req,res){
  var currentPage = 1;
  var d = dan.find({},function(err,d){
      if(err) console.error(err);
      else{
        var count = dan.count({},function(err,c){
            if(err) console.error(err);
            else{
              res.render('products',{dan: d,
                                   
                                    totalproducts: c,
                                    pageCount: c/3,
                                    currentPage: currentPage
              });
            }
        });
        
      }
  });
});



app.post('/post/count-don-hang',function(req,res){
  var c= donHang.count({},function(err,c){
        if(err) console.error(err);
        else{
          console.log(c);
          res.send(c.toString());
        }
     });
});


app.get('/login', function(req, res) {
  res.render('login');
});



app.get('/view/don-hang',function(req,res){
  var dh = donHang.find({},function(err,dh){
      if(err) console.log(err);
      else{
        c = donHang.count({},function(er,c){
            if(er) console.error(er);
            else{
              res.render('view-don-hang',{donHang: dh,count: c});
            }
        });
        
      }
  });
});

app.get('/buy/:id',function(req,res){
  var d = dan.find({},function(err,d){
      if(err) console.error(err);
      else{
        res.render('buy',{dan:d,id: req.params.id});
      }
  });
    
});



app.get('/add/product',function(req,res){
    res.render('add_product');
});

app.get('/:filter',function(req,res){
  var filter = req.params.filter;
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
          res.render('filter',{dan: d,chosen: chosen});
        }
        
  });
}
else if(chose_brand == true){
  var d = dan.find({brand: chosen},function(err,d){
        if(err) console.error(err);
        else{
          res.render('filter',{dan: d,chosen: chosen});
        }
        
  });
}

else if(filter == 'brand-new'){
    var d = dan.find({brand_new: true},function(err,d){
        if(err) console.error(err);
        else{
          res.render('filter',{dan: d,chosen: 'Đàn Brand New'});
        }
        
  });
}
else if(filter == 'gioi-thieu'){
    res.render('gioi_thieu');
}


else if(filter == 'contact'){
    res.render('contact');
}
else if(filter == 'tuyen-dung'){
    res.render('tuyen-dung');
}
else if(filter == 'tu-van'){
    res.render('tu-van');
}
else if(filter == 'dao-tao'){
    res.render('dao-tao');

}
else if(filter == 'learn'){
    res.render('learn');
}
else if(filter == 'news'){
    res.render('news');
}
else if(filter == 'filter-grand'){
    var currentPage = 1;
  var d = dan.find({category: 'Grand Piano'},function(err,d){
      if(err) console.error(err);
      else{
        var count = dan.count({},function(err,c){
            if(err) console.error(err);
            else{
              res.render('products',{dan: d,
                                   
                                    totalproducts: c,
                                    pageCount: c/3,
                                    currentPage: currentPage
              });
            }
        });
        
      }
  });
}
else if(filter == 'filter-all'){
     var currentPage = 1;
  var d = dan.find({},function(err,d){
      if(err) console.error(err);
      else{
        var count = dan.count({},function(err,c){
            if(err) console.error(err);
            else{
              res.render('products',{dan: d,
                                   
                                    totalproducts: c,
                                    pageCount: c/3,
                                    currentPage: currentPage
              });
            }
        });
        
      }
  });
}
else if(filter == 'filter-upright'){
     var currentPage = 1;
  var d = dan.find({category: 'Upright Piano'},function(err,d){
      if(err) console.error(err);
      else{
        var count = dan.count({},function(err,c){
            if(err) console.error(err);
            else{
              res.render('products',{dan: d,
                                   
                                    totalproducts: c,
                                    pageCount: c/3,
                                    currentPage: currentPage
              });
            }
        });
        
      }
  });
}
else if(filter == 'filter-organ'){
    var currentPage = 1;
  var d = dan.find({category: 'Đàn Organ'},function(err,d){
      if(err) console.error(err);
      else{
        var count = dan.count({},function(err,c){
            if(err) console.error(err);
            else{
              res.render('products',{dan: d,
                                   
                                    totalproducts: c,
                                    pageCount: c/3,
                                    currentPage: currentPage
              });
            }
        });
        
      }
  });
}
else if(filter == 'filter-elect'){
   var currentPage = 1;
  var d = dan.find({category: 'Đàn Piano Điện'},function(err,d){
      if(err) console.error(err);
      else{
        var count = dan.count({},function(err,c){
            if(err) console.error(err);
            else{
              res.render('products',{dan: d,
                                   
                                    totalproducts: c,
                                    pageCount: c/3,
                                    currentPage: currentPage
              });
            }
        });
        
      }
  });
}
else if(filter == 'filter-cheap'){
    var currentPage = 1;
  var d = dan.find({category: 'Piano Giá Rẻ'},function(err,d){
      if(err) console.error(err);
      else{
        var count = dan.count({},function(err,c){
            if(err) console.error(err);
            else{
              res.render('products',{dan: d,
                                   
                                    totalproducts: c,
                                    pageCount: c/3,
                                    currentPage: currentPage
              });
            }
        });
        
      }
  });
}
else if(filter == 'filter-other'){
    var currentPage = 1;
  var d = dan.find({category: 'Khác'},function(err,d){
      if(err) console.error(err);
      else{
        var count = dan.count({},function(err,c){
            if(err) console.error(err);
            else{
              res.render('products',{dan: d,
                                   
                                    totalproducts: c,
                                    pageCount: c/3,
                                    currentPage: currentPage
              });
            }
        });
        
      }
  });
}




else{
  var d = dan.find(function(err,d){
    if(err) console.error(err);
    else{
    
    res.render('piano',{dan: d});
    }

  });
}

  
    
});

app.get('/account/manage',function(req,res){
    res.render('account-manage');
});


app.post('/post/buy-confirm',function(req,res){
    var time = Date();
    var product_name = req.body.product_name;
    var product_code = req.body.product_code;
    var product_id = req.body.product_id;
    var name = req.body.name;
    var phone = req.body.phone;
    var address = req.body.address;
    var email = req.body.email;

   

    if(name != '' && phone != '' && address != '' && email != ''){
      var dh = new donHang({
        time: time,
        dan_id: product_id,
        name: product_name,
        code: product_code,
        kh_name:name,
        phone: phone,
        email: email

      });

      dh.save(function(err){
          if(err) console.error(err);
          else{
            res.send('ok');
          }
      });

    }
    else{
      res.send('fail');
    }
});


app.post('/post/change-password',function(req,res){
    var old_pass = req.body.old_pass;
    var new_pass = req.body.new_pass;
user.count({name: 'admin',password: old_pass},function(er,c){
    if(er) console.error(er);
    else{
      if(c == 1){
         user.update({name: 'admin'},{password: new_pass},function(err){
          if(err) console.error(err);
          else{
            res.send('ok');
          }
      });
      }
      else{
        res.send('fail');
      }
    }
});
     

});


app.post('/post/add-news',function(req,res){
    var news_name = req.body.news_name;
    var news_content = req.body.news_content;

    var sal = new news({
        name: news_name,
        content: news_content
    });

    sal.save(function(err){
        if(err) console.error(err);
        else{
          res.send('ok');
        }
    });

     

});

app.post('/post/add-sale',function(req,res){
    var sale_name = req.body.sale_name;
    var sale_content = req.body.sale_content;
console.log(sale_name);
console.log(sale_content);
  

    sale.update({id:1},{name:sale_name,content: sale_content,id:1},function(err){
        if(err) console.error(err);
        else{
          res.send('ok');
        }
    });
     

});

app.post('/post/sale-info',function(req,res){
    var sal = sale.findOne({id:1},function(err,sal){
      if(err) console.error(err);
      else{
        console.log(sal);
        res.send(JSON.stringify({name: sal.name, content: sal.content}));
      }
    });
});

app.post('/post/news-info',function(req,res){
    var n = news.find({},function(err,n){
      if(err) console.error(err);
      else{
        res.send(JSON.stringify(n));
      }
    });
});


app.post('/post/add/product',upload.single('file'),function(req,res,next){

  var name = req.body.name;
  var brand = req.body.brand;
  var brand_new = req.body.brand_new;
  var br;
  var origin = req.body.origin;
  var category = req.body.category;
  var last_price = req.body.last_price;
  var price = req.body.price;
  var product_code = req.body.product_code;
  var promotion = req.body.promotion;
  var description = req.body.description;
  var parameter = req.body.parameter;

if(brand_new == 'on'){
  br = true;
}
else{
  br = false;
}
   //upload FILE
        var file = req.file;
      
         
        //Lấy các thông tin về file
        var originalname = file.originalname;
      
        var encoding = file.encoding;
       

        var mimetype = file.mimetype;
        

        var destination = file.destination;
       
        var filename = file.filename;
       

        var path = file.path;
        
        var size = file.size;
        

        // Đường dẫn lưu ảnh
      var pathUpload       = __dirname + '/public/piano' + originalname;
      

    
 

 if(name != ''&& brand != ''&& origin != '' && category != '' && last_price >=0 && price >= 0 && product_code != '' && promotion != '' && description !='' ){
          fs.readFile(file.path, function(err, data) {
        if(!err) {
            fs.writeFile(pathUpload, data, function() {
                var newDan = new dan({
                    name: name,
                    brand: brand,
                    brand_new: br,
                    origin: origin,
                    promotion: promotion,
                    product_code: product_code,
                    description: description,
                    category: category,
                    last_price: last_price,
                    price: price,
                    image: '/piano/'+originalname,
                    parameter: parameter
                });

                newDan.save(function(err){
                    if(err) console.error(err);
                    else{
                        res.redirect('/admin');

                    }
                });
                // Return anh vua upload
                            });

          }
        else{
            res.send('Lỗi, thêm sản phẩm thất bại! Xin vui lòng kiểm tra lại!');
        }

        });
 }
        
});



app.post('/post/edit/product',upload.single('file'),function(req,res,next){
  var id = req.body.edit_id;
  var name = req.body.edit_name;
  var brand = req.body.edit_brand;
  var brand_new = req.body.edit_brand_new;
  var br;
  var origin = req.body.edit_origin;
  var category = req.body.edit_category;
  var last_price = req.body.edit_last_price;
  var price = req.body.edit_price;
  var product_code = req.body.edit_product_code;
  var promotion = req.body.edit_promotion;
  var description = req.body.edit_description;
  var parameter = req.body.edit_parameter;

if(brand_new == 'on'){
  br = true;
}
else{
  br = false;
}
   //upload FILE
        var file = req.file;
      
         
        //Lấy các thông tin về file
        var originalname = file.originalname;
      
        var encoding = file.encoding;
       

        var mimetype = file.mimetype;
        

        var destination = file.destination;
       
        var filename = file.filename;
       

        var path = file.path;
        
        var size = file.size;
        

        // Đường dẫn lưu ảnh
      var pathUpload       = __dirname + '/public/piano' + originalname;
      

    
 

 if(name != ''&& brand != ''&& origin != '' && category != '' && last_price >=0 && price >= 0 && product_code != '' && promotion != '' && description !='' ){
          fs.readFile(file.path, function(err, data) {
        if(!err) {
            fs.writeFile(pathUpload, data, function() {
                var editedDan = {
                    name: name,
                    brand: brand,
                    brand_new: br,
                    origin: origin,
                    promotion: promotion,
                    product_code: product_code,
                    description: description,
                    category: category,
                    last_price: last_price,
                    price: price,
                    image: '/piano/'+originalname,
                    parameter: parameter
                };

                dan.update({_id: id},editedDan,function(err){
                    if(err) console.error(err);
                    else{
                        res.redirect('/admin');

                    }
                });
                // Return anh vua upload
                            });

          }
        else{
            res.send('Lỗi, thêm sản phẩm thất bại! Xin vui lòng kiểm tra lại!');
        }

        });
 }
        
});





app.post('/login',function(req,res){
  res.redirect('/admin');
});

app.post('/post/product/search',function(req,res){
      var quer = req.body.query;
      dan.search(quer,{name: 1},function(err,data){
          if(err) console.error(err);
          else{
            res.send(data);
          }
      });
});

app.get('/test/test',function(req,res){
    res.render('user');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
