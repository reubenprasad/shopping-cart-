var express = require('express');
const app = express();
const path = require('path')

app.set("view engine","ejs");

app.use(express.static(path.join(__dirname,"/public")))

app.get("/",function(req,res){
    res.render("vproducts",{nav:[{link:"/book",title:"All Products"}]});
     });


     app.listen(process.env.PORT || 3000, () => console.log('Server Running on http://localhost:3000')); 