

var marvelCharacters = ["HULK", "IRONMAN", "ANTMAN", "WASP", "SPIDERMAN", "THANOS", "BLACKWIDOW", "DEADPOOL", "GROOT"];
var totalGuesses = 9;       // 
var userGuesses = [];       // 
var computerPick;           // 
var wordGuessed = [];       // 
var guessesLeft = 0;        // 
var finishedGame = false;   //    
var wins = 0;               //
var losses = 0;             //

// 
var keySound = new Audio('./assets/sounds/typewriter-key.wav');

// 
function startGame() {
    guessesLeft = totalGuesses;

    //
    computerPick = Math.floor(Math.random() * (marvelCharacters.length));

    if(marvelCharacters[computerPick] == marvelCharacters[0]) {
        $('.clue').html("<img src='assets/images/hulk.jpg' width='300'/>");
    }else if(marvelCharacters[computerPick] == marvelCharacters[1]) {
        $('.clue').html("<img src='assets/images/ironman.jpg' width='300'/>");
    }else if(marvelCharacters[computerPick] == marvelCharacters[2]) {
        $('.clue').html("<img src='assets/images/antman.jpg' width='300'/>");
    }else if(marvelCharacters[computerPick] == marvelCharacters[3]) {
        $('.clue').html("<img src='assets/images/wasp.jpg' width='300'/>");
    }else if(marvelCharacters[computerPick] == marvelCharacters[4]) {
        $('.clue').html("<img src='assets/images/spiderman.jpg' width='300'/>");  
    }else if(marvelCharacters[computerPick] == marvelCharacters[5]) {
        $('.clue').html("<img src='assets/images/thanos.jpg' width='300'/>");  
    }else if(marvelCharacters[computerPick] == marvelCharacters[6]) {
        $('.clue').html("<img src='assets/images/blackwidow.jpg' width='300'/>");  
    }else if(marvelCharacters[computerPick] == marvelCharacters[7]) {
        $('.clue').html("<img src='assets/images/deadpool.jpg' width='300'/>");       
    }else if(marvelCharacters[computerPick] == marvelCharacters[8]) {
        $('.clue').html("<img src='assets/images/groot.jpg' width='300'/>");                                
    }else if((marvelCharacters[computerPick] == marvelCharacters[9])); 

    // 
    userGuesses = [];
    wordGuessed = [];

    //
    for (var i = 0; i < marvelCharacters[computerPick].length; i++) {
        wordGuessed.push("_");
    }   

    // 
    document.getElementById("pressKeyTryAgain").style.cssText= "display: none";
    document.getElementById("gameover-image").style.cssText = "display: none";
    document.getElementById("youwin-image").style.cssText = "display: none";

    //
    refreshScreen();
};

// 
function refreshScreen() {

    document.getElementById("gameWins").innerText = wins;
    document.getElementById("gameLosses").innerText = losses;

    var guessingWordText = "";
    for (var i = 0; i < wordGuessed.length; i++) {
        guessingWordText += wordGuessed[i];
    }

    //
    document.getElementById("currentWord").innerText = guessingWordText;
    document.getElementById("guessesLeft").innerText = guessesLeft;
    document.getElementById("userGuesses").innerText = userGuesses;
};

//
function evaluateGuess(letter) {
    var positions = [];

    for (var i = 0; i < marvelCharacters[computerPick].length; i++) {
        if(marvelCharacters[computerPick][i] === letter) {
            positions.push(i);
        }
    }

    if (positions.length <= 0) {
        guessesLeft--;
    } else {
        for(var i = 0; i < positions.length; i++) {
            wordGuessed[positions[i]] = letter;
        }
    }
};

//
function checkWin() {
    if(wordGuessed.indexOf("_") === -1) {
        document.getElementById("youwin-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText= "display: block";
        wins++;
        finishedGame = true;
    }
};

//
function checkLoss()
{
    if(guessesLeft <= 0) {
        document.getElementById("gameover-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display: block";
        losses++;
        finishedGame = true;
    }
}

//
function makeGuess(letter) {
    if (guessesLeft > 0) {
        //
        if (userGuesses.indexOf(letter) === -1) {
            userGuesses.push(letter);
            evaluateGuess(letter);
        }
    }
};

// 
document.onkeydown = function(event) {
    //
    if(finishedGame) {
        startGame();
        finishedGame = false;
    } else {
        // 
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            keySound.play();
            makeGuess(event.key.toUpperCase());
            refreshScreen();
            checkWin();
            checkLoss();
        }
    }
};

