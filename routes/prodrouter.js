var express = require('express')
const router = express.Router();
const path = require('path')
var multer = require('multer');
var storage =   multer.diskStorage({  
    destination: (req, file, callback)=>{  
      callback(null, './public/images');  
    },  
    filename: (req, file, callback)=>{  
      callback(null, file.originalname);  
    }  
  });  
var upload = multer({ storage : storage}).single('image');
router.use(express.static(path.join(__dirname,"/public")))
var mongoose = require('mongoose')
var url = "mongodb+srv://reuben:1234@cluster0-fcmwh.mongodb.net/Shopping?retryWrites=true"
var products = require("../model/product"); 
mongoose.connect(url,function(err){
    if(err) 
    throw err;
    else
    console.log("database connected")
});
module.exports = router;

router.get("/",function(req,res){
    products.find({},function(err,result){
        
        res.render("allproducts",{nav:[{link:"/",title:"Home"},{link:"/prod/addproduct",title:"Add Product"},{link:"/prod/updateproduct",title:"Update Product"}],products:result});
    });
})

router.get("/view/:img",function(req,res){    
    res.sendFile(path.join(__dirname+"../../public/images/"+req.params.img))
})

router.get("/singleproduct/:id",function(req,res){
products.find({id:req.params.id},function(err,result){
    res.render("singleproduct",{nav:[{link:"/",title:"Home"},{link:"/prod/addproduct",title:"Add Product"},{link:"/prod/updateproduct",title:"Update Product"}],products:result});  
  })
    
})

router.get("/addproduct",function(req,res){
        res.render("addproduct",{nav:[{link:"/",title:"Home"},{link:"/prod/addproduct",title:"Add Product"},{link:"/prod/updateproduct",title:"Update Product"}]});
})

router.post("/addproduct",upload,function(req,res){
    var p = new products();
    p.title = req.body.title;
    p.id = req.body.id;
    p.price = req.body.price;
    p.image = req.file.filename;
    p.save(function(err){
       if (err) throw err;
       else{
           console.log("Added");
           res.redirect("/");
       }
   })
})

router.get("/updateproduct",function(req,res){
    products.find({},function(err,result){
        
        res.render("updateproduct",{nav:[{link:"/",title:"Home"},{link:"/prod/addproduct",title:"Add Product"},{link:"/prod/updateproduct",title:"Update Product"}],products:result});
    });
})

router.get("/editproduct/:id",function(req,res){
    products.find({id:req.params.id},function(err,result){
        if (err) throw err;
        res.render("editproduct",{nav:[{link:"/",title:"Home"},{link:"/prod/addproduct",title:"Add Product"},{link:"/prod/updateproduct",title:"Update Product"}],products:result});
    })
})
    
router.post("/editproduct", upload, function(req,res){
    products.updateOne({id:req.body.id} ,{$set:{
        title:req.body.title,
        id : req.body.id,
        price : req.body.price,
        image : req.file.filename
    }}, function(err,result){
        if (err) throw err;
        else{
            products.find({},(err,result)=>{
                if (err) throw err;
                else
                    res.redirect("/prod/updateproduct")
            })
        }
    }) 
})

router.get("/deleteproduct/:pid",function(req,res){
    products.deleteOne({id:req.params.pid},function(err,result){
        if (err) throw err;
        else
        {
            products.find({},(err,result)=>{
                if(err) throw err;
                else
                    res.redirect("/prod/updateproduct")
            })
        }
    })
})