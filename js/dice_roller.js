let images = ["images/dice-01.svg",
    "images/dice-02.svg",
    "images/dice-03.svg",
    "images/dice-04.svg",
    "images/dice-05.svg",
    "images/dice-06.svg"];
let dice = document.querySelectorAll("img");

const initialValuesToShow = 5;
document.querySelector("#die-1").setAttribute("src", images[initialValuesToShow]);
document.querySelector("#die-2").setAttribute("src", images[initialValuesToShow]);

function roll(callback) {
    dice.forEach(function (die) {
        die.classList.add("shake");
    });
    setTimeout(function () {
        dice.forEach(function (die) {
            die.classList.remove("shake");
        });
        let dieOneValue = Math.floor(Math.random() * 6);
        let dieTwoValue = Math.floor(Math.random() * 6);
        document.querySelector("#die-1").setAttribute("src", images[dieOneValue]);
        document.querySelector("#die-2").setAttribute("src", images[dieTwoValue]);
        callback([(dieOneValue + 1), (dieTwoValue + 1)]);
    },
        1000
    );
}
//roll();