const express = require("express");
const bodyParser = require("body-parser");

const date = require(__dirname +"/date.js");

const app = express();

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.get("/", function(req, res){
    let day = date.getDate();

    res.render("list", {listTitle: day, newListItems: items});

})

app.post("/", function(req, res){
    var item = req.body.newItem;

    if(req.body.button === "Work"){
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
})

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work", newListItems: workItems})
})

app.get("/about", function(req,res){
    res.render("about")
})

app.listen(process.env.PORT || 5000, function(){
    console.log("Server running on port: http://localhost:5000");
})