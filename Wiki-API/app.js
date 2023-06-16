const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');

const app = express();

const PORT = process.env.PORT || 5000

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/wikiDB");

const articleSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Article = mongoose.model("Article", articleSchema);

app.route("/articles")
.get(
    function(req, res){
    Article.find(function(err, foundArticles){
        if(err){
            res.send(err);
        } else {
            res.send(foundArticles);
        }
    })
}
)

.post(
    function(req, res){
    console.log(req.body.title);
    console.log(req.body.content);

    let article = new Article({
        title: req.body.title,
        content: req.body.content
    })

    article.save(function(err){
        if(err){
            res.send(err);
        } else {
            res.send("article created");
        }
    });
}
)

.delete(
    function(req, res){
    Article.deleteMany({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("Elements deleted!");
        }
    })
}
)

app.route("/articles/:articleID")
.get(
    function(req, res) {
        const articleID = req.params.articleID;
        Article.findOne({_id: articleID}, function(err, foundArticle){
            if (err) {
                console.log(err);
            } else {
                res.send(foundArticle);
            }
        })
    }
)

app.listen(PORT, function(){
    console.log("server is running on: http://localhost:"+PORT);
})