require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require("mongoose-find-or-create");

const saltRounds = 10;

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static("public"));

app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/userDB");

const userSchema = new mongoose.Schema({
    email: String,
    password: String, 
    googleId: String,
    secret: String
})

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate)

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/secrets"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.get("/", function(req, res){
    res.render("home");
})

app.get("/auth/google",
    passport.authenticate("google", {scope: ["profile"]})
)

app.get("/auth/google/secrets", 
    passport.authenticate("google", {failureRedirect: "/login"}),
    function(req, res){
        res.redirect("/secrets");
    }
)

app.get("/login", function(req, res){
    res.render("login");
})

app.post("/login", function(req, res){
    const user = new User ({
        email: req.body.username,
        password: req.body.password
    })

    // User.findOne({email: email}, function(err, foundUser){
    //     if(err){
    //         console.log(err);
    //     } else {
    //         if(foundUser){
    //             bcrypt.compare(password, foundUser.password, function(err, result){
    //                 if(result === true){
    //                     res.render("secrets");
    //                 }
    //             })
    //         } else {
    //             console.log("Incorrect user password");
    //         }
    //     }
    // })

    req.login(user, function(err){
        if(err){
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/secrets");
            });
        }
    })
})

app.get("/submit", function(req, res){
    if(req.isAuthenticated()){
        res.render("submit");
    } else {
        res.redirect("/login");
    }
})

app.post("/submit", function(req, res){
    const submitSecret = req.body.secret;

    console.log(req.user);

    User.findById(req.user._id, function(err, foundUser){
        if(err){
            console.log(err);
        } else {
            if (foundUser){
                foundUser.secret = submitSecret;
                foundUser.save(function(){
                    res.redirect("/secrets");
                })
            }
        }
    })
})

app.get("/register", function(req, res){
   res.render("register")
})

app.get("/secrets", function(req, res){
    User.find({"secret": {$ne:null}}, function(err, foundUsers){
        if(err){
            console.log(err);
        } else {
            if (foundUsers) {
                res.render("secrets", {usersWithSecrets: foundUsers})
            }
        }
    })
})

app.post("/register", function(req, res){
    // bcrypt.hash(req.body.password, saltRounds, function(err, hash){
    //     const newUser = User({
    //         email: req.body.username,
    //         password: hash
    //     })

    //     newUser.save(function(err){
    //         if(err){
    //             console.log(err);
    //         } else {
    //             res.render("secrets");
    //         }
    //     })
    // })

    User.register({username: req.body.username}, req.body.password, function(err, user){
        if(err){
            console.log(err);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/secrets");
            })
        }
    })

})

app.get("/logout", function(req, res, next){

    req.logout(function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect("/");
        }
    });
})

app.listen(process.env.PORT || 5000, function(){
    console.log("Server is running on port: http://localhost:5000");
})