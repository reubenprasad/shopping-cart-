var express = require('express');
const app = express();
const path = require('path')

app.set("view engine","ejs");
var prodrouter = require("./routes/prodrouter")
var userrouter = require("./routes/userrouter")
app.use("/prod",prodrouter);
app.use("/user",userrouter);
app.use(express.static(path.join(__dirname,"/public")))

app.get("/",function(req,res){
    res.render("home",{nav:[{link:"/prod",title:"All Products"}]});
     });



     app.listen(process.env.PORT || 3000, () => console.log('Server Running on http://localhost:3000')); 