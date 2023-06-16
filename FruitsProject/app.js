const mongoose = require("mongoose");
// Connection URI
const uri = "mongodb://localhost:27017";

// Database Name
const dbName = "fruitsDB";

mongoose.set("strictQuery", false);
mongoose.connect(uri + "/" + dbName);

// Create a new schema
const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favoriteFruit: fruitSchema
});

const Person = new mongoose.model("Person", personSchema);

const Fruit = new mongoose.model("Fruit", fruitSchema);

const mango = new Fruit({
    name: "Mango",
    rating: 4,
    review: "Decent fruit"
})

mango.save();

// const person = new Person({
//     name: "Ammy",
//     age: 12,
//     favoriteFruit: pineapple 
// });

// person.save();

const fruits = [
    {
        name: "Kiwi",
        review: "The best fruit!"
    },
    {
        name: "Orange",
        review: "Too sour for me"
    },
    {
        name: "Peach",
        review: "weird texture"
    }
]

// Fruit.insertMany(fruits, function(err){
//     if (err){
//         console.log(err);
//     } else {
//         console.log("Successfully saved all the fruits to fruitsDB");
//     }
// })

// Fruit.updateOne({_id: "63ea3af9ca47b24d76d6897c"}, {name: "Matamba"}, function(err, res){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(res);
//     }
// })

// Fruit.deleteOne({_id: "63ea42fd005cbc461e2c3792"}, function(err){
//     console.log(err);
// })

// Person.deleteMany({name: "John Doe"}, function(err){
//     console.log(err);
// })

Fruit.find(function(err, fruits){
    if (err){
        console.log(err);
    } else {
        fruits.forEach(function(fruit){
            console.log(fruit.name);
        });
    }
})

Person.updateOne({age: 23}, {favoriteFruit: mango}, function(err){
    if(err){
        console.log(err);
    } else {
        console.log("Favorite fruit added");
    }
})
