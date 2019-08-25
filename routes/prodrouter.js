var express = require('express')
const router = express.Router();
const path = require('path')
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
        
        res.render("allproducts",{nav:[{link:"/",title:"Home"}],products:result});
    });

router.get("/view/:img",function(req,res){    
        res.sendFile(path.join(__dirname+"../../public/images/"+req.params.img))
})

})
    