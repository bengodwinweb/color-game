var tiles = document.querySelectorAll(".tile");
var colorDisplay = document.querySelector("#color-display")
var jumbotron = document.querySelector(".jumbotron");
var easyButton = document.querySelector("#easyButton");
var hardButton = document.querySelector("#hardButton");
var resetButton = document.querySelector("#resetButton");
var displayMessage = document.querySelector("#display");
var buttons = document.querySelectorAll("button");

var hardMode = true;
var winningColor;
var colorsList = [];

// creates a random RGB color
function randomColor() {
    var num = Math.round(0xffffff * Math.random());
    var r = num >> 16;
    var g = num >> 8 & 255;
    var b = num & 255;
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

// updates colorsList with random colors
function updateColorsList() {
    for (i = 0; i < tiles.length; i++) {
        colorsList[i] = randomColor();
    }
    if(!hardMode){
        for(i = 3; i < tiles.length; i++){
            colorsList[i] = "#232323";
        }
    }
}

// picks a random color from colorsList and sets it to winningColor
function selectWinningColor() {
    if(hardMode){
        winningColor = colorsList[Math.floor(Math.random() * 6)];
    } else {
        winningColor = colorsList[Math.floor(Math.random() * 3)]
    }
    colorDisplay.textContent = winningColor;
}

// updates tile colors to match colorList
function updateTileColors() {
    for (i = 0; i < tiles.length; i++) {
        tiles[i].style.backgroundColor = colorsList[i];
    }
}

// resets for new game
function reset() {
    updateColorsList();
    selectWinningColor();
    updateTileColors();
    jumbotron.style.backgroundColor = "steelblue";
    displayMessage.textContent = "";
    resetButton.textContent = "New Colors"
}

// event listener for tiles
for(i = 0; i < tiles.length; i++){
    tiles[i].addEventListener('click', function(){
        if(this.style.backgroundColor == winningColor){
            for (i = 0; i < tiles.length; i++){
                tiles[i].style.backgroundColor = winningColor;
            }
            if(!hardMode){
                for(i = 3; i < tiles.length; i++){
                    tiles[i].style.backgroundColor = "#232323";
                }
            }
            jumbotron.style.backgroundColor = winningColor;
            displayMessage.textContent = "Correct!";
            resetButton.textContent = "Play Again"
        } else {
            this.style.backgroundColor = "#232323";
            displayMessage.textContent = "Try again"
        }
    });
}

// event listener for reset button
resetButton.addEventListener("click", reset);

// event listener for easy button
easyButton.addEventListener("click", function() {
    if(!hardMode){
        return;
    } else {
        easyButton.classList.add("active");
        hardButton.classList.remove("active");
        hardMode = !hardMode;
        reset();
    }
});

// event listener for hard button
hardButton.addEventListener("click", function() {
    if(hardMode){
        return;
    } else {
        hardButton.classList.add("active");
        easyButton.classList.remove("active");
        hardMode = !hardMode;
        reset();
    }
});

reset();




