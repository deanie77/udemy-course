import emojipedia from "./emojipedia";

var numbers = [3, 56, 2, 48, 5];

//Map -Create a new array by doing something with each item in an array.
const mapNums = numbers.map(function(number){
    return number += 2
})
console.log(mapNums);

//Filter - Create a new array by keeping the items that return true.
const filteredNums = numbers.filter(function(number){
    return number > 10
})
console.log(filteredNums);

//Reduce - Accumulate a value by doing something to each item in an array.
const reducedNums = numbers.reduce(function(accumulator, currentNumber){
    return accumulator + currentNumber
})
console.log(reducedNums);

//Find - find the first item that matches from an array.
const foundNum = numbers.find(function(number){
    return number === 5
})
console.log(foundNum);

//FindIndex - find the index of the first item that matches.
const foundIndex = numbers.findIndex(function(number){
    return number === 48
})
console.log(foundIndex);

const emojiEntry = emojipedia.map(function(emoji){
    return emoji.meaning.substring(0, 100);
})
console.log(emojiEntry);
