var express = require('express')
const router = express.Router();
const path = require('path')
var bodyparser = require('body-parser')
router.use(bodyparser.urlencoded({extended:true}))
router.use(express.static(path.join(__dirname,"/public")))
var mongoose = require('mongoose')
var url = "mongodb+srv://reuben:1234@cluster0-fcmwh.mongodb.net/Shopping?retryWrites=true"
var users = require("../model/user"); 
mongoose.connect(url,function(err){
    if(err) 
    throw err;
    else
    console.log("database connected")
});
module.exports = router;

router.get("/",function(req,res){
    
        res.render("login",{nav:[{link:"/",title:"Home"}]});
})

router.get("/signup",function(req,res){
    
        res.render("signup",{nav:[{link:"/",title:"Home"}]});
})

router.post("/signup",function(req,res){
    
    var u1 = new users();
    u1.username = req.body.unr;
    u1.name = req.body.nr;
    u1.password=req.body.pwr;
    u1.mobile=req.body.mr;
    u1.email=req.body.er;
    u1.role=req.body.role;
    u1.save(function(err){
        if(err) throw err;
        else
        res.redirect('/')
    })
});


router.post("/login",function(req,res){
    users.find({username:req.body.un,password:req.body.pw},function(err,result){
        if(err) 
        throw err;
        else if(result.length == 0)
        {
            res.redirect('/user');
        }
        else
        {
            res.redirect('/prod');
        }
    })
   
    });