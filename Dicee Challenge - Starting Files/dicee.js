var imgList = ["images/dice1.png", "images/dice2.png", "images/dice3.png", "images/dice4.png", "images/dice5.png", "images/dice6.png"];

var randomNum = Math.random() * imgList.length;
var randomNum2 = Math.random() * imgList.length;

var playerOne = Math.floor(randomNum);
var playerTwo = Math.floor(randomNum2);

document.querySelector(".img1").setAttribute("src", imgList[playerOne]);
document.querySelector(".img2").setAttribute("src", imgList[playerTwo]);

if (playerOne > playerTwo) {
    document.querySelector("h1").textContent = "Player 1 Wins!";
} else if (playerTwo > playerOne) {
    document.querySelector("h1").textContent = "Player 2 Wins!";
} else {
    document.querySelector("h1").textContent = "It's a tie!";
}